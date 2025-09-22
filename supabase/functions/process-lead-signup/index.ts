import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));
const hubspotApiKey = Deno.env.get("HUBSPOT_API_KEY");

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface UserSignupData {
  id: string;
  email: string;
  raw_user_meta_data?: {
    first_name?: string;
    last_name?: string;
    user_role?: string;
  };
}

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const userData: UserSignupData = await req.json();
    console.log("Processing lead signup for:", userData.email);

    // Send welcome email via Resend
    const emailResult = await sendWelcomeEmail(userData);
    console.log("Email sent:", emailResult);

    // Create/update HubSpot contact
    const hubspotResult = await createHubSpotContact(userData);
    console.log("HubSpot contact created:", hubspotResult);

    // Send admin notification
    const adminNotificationResult = await sendAdminNotification(userData);
    console.log("Admin notification sent:", adminNotificationResult);

    return new Response(
      JSON.stringify({
        success: true,
        email_sent: emailResult.success,
        hubspot_contact: hubspotResult.success,
        admin_notification: adminNotificationResult.success,
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  } catch (error: any) {
    console.error("Error in process-lead-signup function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

async function sendWelcomeEmail(userData: UserSignupData) {
  try {
    const firstName = userData.raw_user_meta_data?.first_name || "There";
    
    const emailResponse = await resend.emails.send({
      from: "NCHG Team <team@nchg.co.uk>",
      to: [userData.email],
      subject: "Welcome to NCHG - Your Early Access Request is Confirmed!",
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Welcome to NCHG</title>
        </head>
        <body style="margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f8fafc;">
          <div style="max-width: 600px; margin: 0 auto; background-color: white; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
            
            <!-- Header -->
            <div style="background: linear-gradient(135deg, #1e40af 0%, #3b82f6 100%); padding: 40px 30px; text-align: center;">
              <h1 style="color: white; margin: 0; font-size: 28px; font-weight: bold;">Welcome to NCHG</h1>
              <p style="color: #dbeafe; margin: 10px 0 0 0; font-size: 16px;">Next-Generation Ti64 Solutions</p>
            </div>

            <!-- Main Content -->
            <div style="padding: 40px 30px;">
              <h2 style="color: #1f2937; margin: 0 0 20px 0; font-size: 24px;">Hi ${firstName}!</h2>
              
              <p style="color: #4b5563; line-height: 1.6; margin: 0 0 20px 0; font-size: 16px;">
                Thank you for requesting early access to the UK's premier Ti64 marketplace. We're excited to have you join us as we revolutionize the titanium powder trading industry.
              </p>

              <div style="background-color: #f0f9ff; border-left: 4px solid #3b82f6; padding: 20px; margin: 30px 0;">
                <h3 style="color: #1e40af; margin: 0 0 10px 0; font-size: 18px;">What happens next?</h3>
                <ul style="color: #4b5563; line-height: 1.6; margin: 0; padding-left: 20px;">
                  <li>You'll be among the first to access our marketplace when we launch</li>
                  <li>We'll keep you updated on our progress and key milestones</li>
                  <li>You'll have the opportunity to shape our platform with your feedback</li>
                  <li>Early access to exclusive features and preferential trading opportunities</li>
                </ul>
              </div>

              <p style="color: #4b5563; line-height: 1.6; margin: 20px 0; font-size: 16px;">
                As a founding community member, your input will be invaluable in creating the most effective Ti64 trading platform. We'll be in touch soon with updates on our progress.
              </p>

              <div style="text-align: center; margin: 40px 0;">
                <a href="https://nchg.co.uk" style="background: linear-gradient(135deg, #1e40af 0%, #3b82f6 100%); color: white; text-decoration: none; padding: 12px 30px; border-radius: 6px; font-weight: bold; display: inline-block;">Visit Our Website</a>
              </div>
            </div>

            <!-- Footer -->
            <div style="background-color: #f8fafc; padding: 30px; text-align: center; border-top: 1px solid #e5e7eb;">
              <p style="color: #6b7280; margin: 0 0 10px 0; font-size: 14px;">
                Best regards,<br>
                <strong>The NCHG Team</strong>
              </p>
              <p style="color: #9ca3af; margin: 0; font-size: 12px;">
                Next-Generation Chemical Holdings Ltd.<br>
                Pioneering the future of Ti64 solutions
              </p>
            </div>
          </div>
        </body>
        </html>
      `,
    });

    return { success: true, data: emailResponse };
  } catch (error) {
    console.error("Failed to send welcome email:", error);
    return { success: false, error: error.message };
  }
}

async function createHubSpotContact(userData: UserSignupData) {
  try {
    if (!hubspotApiKey) {
      throw new Error("HubSpot API key not configured");
    }

    // Use only safe, standard HubSpot fields
    const contactData = {
      properties: {
        email: userData.email,
        firstname: userData.raw_user_meta_data?.first_name || "",
        lastname: userData.raw_user_meta_data?.last_name || "",
        lifecyclestage: "lead"
      }
    };

    const response = await fetch("https://api.hubapi.com/crm/v3/objects/contacts", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${hubspotApiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(contactData),
    });

    if (!response.ok) {
      // If contact exists, try to update instead
      if (response.status === 409) {
        console.log("Contact exists, attempting to update...");
        return await updateHubSpotContact(userData);
      }
      
      // Get detailed error response
      const errorBody = await response.text();
      console.error("HubSpot API error response:", errorBody);
      throw new Error(`HubSpot API error: ${response.status} ${response.statusText} - ${errorBody}`);
    }

    const result = await response.json();
    return { success: true, data: result };
  } catch (error) {
    console.error("Failed to create HubSpot contact:", error);
    return { success: false, error: error.message };
  }
}

async function updateHubSpotContact(userData: UserSignupData) {
  try {
    // Search for existing contact by email
    const searchResponse = await fetch(
      `https://api.hubapi.com/crm/v3/objects/contacts/search`,
      {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${hubspotApiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          filterGroups: [{
            filters: [{
              propertyName: "email",
              operator: "EQ",
              value: userData.email
            }]
          }]
        }),
      }
    );

    if (!searchResponse.ok) {
      throw new Error(`HubSpot search error: ${searchResponse.status}`);
    }

    const searchResult = await searchResponse.json();
    if (searchResult.results.length === 0) {
      throw new Error("Contact not found for update");
    }

    const contactId = searchResult.results[0].id;
    const updateData = {
      properties: {
        lifecyclestage: "lead"
      }
    };

    const updateResponse = await fetch(
      `https://api.hubapi.com/crm/v3/objects/contacts/${contactId}`,
      {
        method: "PATCH",
        headers: {
          "Authorization": `Bearer ${hubspotApiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updateData),
      }
    );

    if (!updateResponse.ok) {
      const errorBody = await updateResponse.text();
      console.error("HubSpot update error response:", errorBody);
      throw new Error(`HubSpot update error: ${updateResponse.status} - ${errorBody}`);
    }

    const result = await updateResponse.json();
    return { success: true, data: result };
  } catch (error) {
    console.error("Failed to update HubSpot contact:", error);
    return { success: false, error: error.message };
  }
}

async function sendAdminNotification(userData: UserSignupData) {
  try {
    const firstName = userData.raw_user_meta_data?.first_name || "Unknown";
    const lastName = userData.raw_user_meta_data?.last_name || "";
    const userRole = userData.raw_user_meta_data?.user_role || "individual";
    
    const emailResponse = await resend.emails.send({
      from: "NCHG Platform <team@nchg.co.uk>",
      to: ["nick@nchg.co.uk"],
      subject: "🎉 New User Signup - NCHG Platform",
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>New User Signup</title>
        </head>
        <body style="margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f8fafc;">
          <div style="max-width: 600px; margin: 0 auto; background-color: white; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
            
            <!-- Header -->
            <div style="background: linear-gradient(135deg, #059669 0%, #10b981 100%); padding: 30px; text-align: center;">
              <h1 style="color: white; margin: 0; font-size: 24px; font-weight: bold;">🎉 New User Signup</h1>
              <p style="color: #d1fae5; margin: 10px 0 0 0; font-size: 14px;">NCHG Platform</p>
            </div>

            <!-- Main Content -->
            <div style="padding: 30px;">
              <h2 style="color: #1f2937; margin: 0 0 20px 0; font-size: 20px;">New User Details</h2>
              
              <div style="background-color: #f0fdf4; border-left: 4px solid #10b981; padding: 20px; margin: 20px 0;">
                <table style="width: 100%; border-collapse: collapse;">
                  <tr>
                    <td style="padding: 8px 0; font-weight: bold; color: #065f46; width: 120px;">Name:</td>
                    <td style="padding: 8px 0; color: #374151;">${firstName} ${lastName}</td>
                  </tr>
                  <tr>
                    <td style="padding: 8px 0; font-weight: bold; color: #065f46;">Email:</td>
                    <td style="padding: 8px 0; color: #374151;">${userData.email}</td>
                  </tr>
                  <tr>
                    <td style="padding: 8px 0; font-weight: bold; color: #065f46;">Role:</td>
                    <td style="padding: 8px 0; color: #374151;">${userRole}</td>
                  </tr>
                  <tr>
                    <td style="padding: 8px 0; font-weight: bold; color: #065f46;">User ID:</td>
                    <td style="padding: 8px 0; color: #374151; font-family: monospace; font-size: 12px;">${userData.id}</td>
                  </tr>
                  <tr>
                    <td style="padding: 8px 0; font-weight: bold; color: #065f46;">Signup Time:</td>
                    <td style="padding: 8px 0; color: #374151;">${new Date().toLocaleString('en-GB')}</td>
                  </tr>
                </table>
              </div>

              <p style="color: #4b5563; line-height: 1.6; margin: 20px 0; font-size: 14px;">
                This user has successfully registered for early access to the NCHG Ti64 marketplace platform. 
                A welcome email has been sent, and their contact information has been added to HubSpot.
              </p>

              <div style="text-align: center; margin: 30px 0;">
                <a href="https://app.hubspot.com/contacts/45977443/contacts/list/view/all/" style="background: linear-gradient(135deg, #059669 0%, #10b981 100%); color: white; text-decoration: none; padding: 10px 20px; border-radius: 6px; font-weight: bold; display: inline-block; margin-right: 10px;">View in HubSpot</a>
                <a href="https://supabase.com/dashboard/project/zvrnwhjiomtraaphfzmk/auth/users" style="background: #374151; color: white; text-decoration: none; padding: 10px 20px; border-radius: 6px; font-weight: bold; display: inline-block;">View in Supabase</a>
              </div>
            </div>

            <!-- Footer -->
            <div style="background-color: #f8fafc; padding: 20px; text-align: center; border-top: 1px solid #e5e7eb;">
              <p style="color: #6b7280; margin: 0; font-size: 12px;">
                Automated notification from NCHG Platform
              </p>
            </div>
          </div>
        </body>
        </html>
      `,
    });

    return { success: true, data: emailResponse };
  } catch (error) {
    console.error("Failed to send admin notification:", error);
    return { success: false, error: error.message };
  }
}

serve(handler);