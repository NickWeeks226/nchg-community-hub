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

    return new Response(
      JSON.stringify({
        success: true,
        email_sent: emailResult.success,
        hubspot_contact: hubspotResult.success,
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

    const contactData = {
      properties: {
        email: userData.email,
        firstname: userData.raw_user_meta_data?.first_name || "",
        lastname: userData.raw_user_meta_data?.last_name || "",
        lead_source: "Early Access Request",
        lead_source_detail: "Ti64 Marketplace",
        lifecyclestage: "lead",
        user_role: userData.raw_user_meta_data?.user_role || "individual",
        signup_date: new Date().toISOString(),
        hs_lead_status: "NEW"
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
      throw new Error(`HubSpot API error: ${response.status} ${response.statusText}`);
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
        lead_source: "Early Access Request",
        lead_source_detail: "Ti64 Marketplace",
        user_role: userData.raw_user_meta_data?.user_role || "individual",
        signup_date: new Date().toISOString(),
        hs_lead_status: "NEW"
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
      throw new Error(`HubSpot update error: ${updateResponse.status}`);
    }

    const result = await updateResponse.json();
    return { success: true, data: result };
  } catch (error) {
    console.error("Failed to update HubSpot contact:", error);
    return { success: false, error: error.message };
  }
}

serve(handler);