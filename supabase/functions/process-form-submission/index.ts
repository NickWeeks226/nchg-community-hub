import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface FormSubmissionRequest {
  formType: string;
  formData: Record<string, any>;
  customerEmail: string;
  customerName: string;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { formType, formData, customerEmail, customerName }: FormSubmissionRequest = await req.json();

    console.log(`Processing ${formType} form submission for ${customerEmail}`);

    // Send confirmation email to customer
    const customerEmailResponse = await resend.emails.send({
      from: "NCHG <nick@nchg.co.uk>",
      to: [customerEmail],
      subject: getCustomerEmailSubject(formType),
      html: generateCustomerEmailHTML(formType, customerName, formData),
    });

    console.log("Customer confirmation email sent:", customerEmailResponse);

    // Send notification email to admin
    const adminEmailResponse = await resend.emails.send({
      from: "NCHG Forms <nick@nchg.co.uk>",
      to: ["nick@nchg.co.uk"],
      subject: `New ${formType} Submission - ${customerName}`,
      html: generateAdminEmailHTML(formType, formData),
    });

    console.log("Admin notification email sent:", adminEmailResponse);

    return new Response(
      JSON.stringify({ 
        success: true, 
        customerEmailId: customerEmailResponse.data?.id,
        adminEmailId: adminEmailResponse.data?.id 
      }), 
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
          ...corsHeaders,
        },
      }
    );
  } catch (error: any) {
    console.error("Error in process-form-submission function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

function getCustomerEmailSubject(formType: string): string {
  const subjects = {
    "lead-capture": "Your Ti64 Assessment Request Received",
    "founding-member": "Your Founding Membership Application Received",
    "marketplace-early-access": "Your Marketplace Early Access Request Received", 
    "operational-excellence": "Your Operational Excellence Assessment Request Received",
    "ti64-database": "Your Ti64 Database Access Request Received",
    "reconditioning-services": "Your Reconditioning Services Request Received"
  };
  return subjects[formType] || "Your Request Received";
}

function generateCustomerEmailHTML(formType: string, customerName: string, formData: Record<string, any>): string {
  const baseStyle = `
    <style>
      body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; }
      .container { max-width: 600px; margin: 0 auto; padding: 20px; }
      .header { background: linear-gradient(135deg, #1e40af, #3b82f6); color: white; padding: 30px; text-align: center; border-radius: 8px 8px 0 0; }
      .content { background: #ffffff; padding: 30px; border: 1px solid #e5e7eb; }
      .footer { background: #f9fafb; padding: 20px; text-align: center; border-radius: 0 0 8px 8px; font-size: 14px; color: #6b7280; }
      .button { display: inline-block; background: #1e40af; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; margin: 20px 0; }
    </style>
  `;

  const messages = {
    "lead-capture": {
      title: "Ti64 Assessment Request Confirmed",
      content: `Thank you for requesting a free Ti64 powder assessment. We'll contact you within 24 hours to schedule your assessment and discuss how we can help optimize your Ti64 strategy.`,
      nextSteps: "Our technical team will review your requirements and contact you to schedule the assessment."
    },
    "founding-member": {
      title: "Founding Membership Application Received",
      content: `Thank you for applying to become a founding member. We're excited about your interest in joining our community of industry leaders.`,
      nextSteps: "We'll review your application and contact you within 48 hours with next steps."
    },
    "marketplace-early-access": {
      title: "Marketplace Early Access Request Confirmed",
      content: `Thank you for requesting early access to our marketplace. We're building something special and appreciate your interest.`,
      nextSteps: "We'll notify you as soon as early access becomes available."
    },
    "operational-excellence": {
      title: "Operational Excellence Assessment Request Confirmed", 
      content: `Thank you for requesting an operational excellence assessment. Our team will analyze your requirements and provide recommendations.`,
      nextSteps: "We'll contact you within 24 hours to schedule your assessment."
    },
    "ti64-database": {
      title: "Ti64 Database Access Request Confirmed",
      content: `Thank you for requesting access to our Ti64 Performance Database. We'll review your request and provide access details.`,
      nextSteps: "We'll contact you within 24 hours with access information."
    },
    "reconditioning-services": {
      title: "Reconditioning Services Request Confirmed",
      content: `Thank you for requesting powder reconditioning services. Our technical team will review your requirements.`,
      nextSteps: "We'll contact you within 24 hours to discuss your reconditioning needs."
    }
  };

  const message = messages[formType] || messages["lead-capture"];

  return `
    ${baseStyle}
    <div class="container">
      <div class="header">
        <h1>${message.title}</h1>
      </div>
      <div class="content">
        <p>Dear ${customerName},</p>
        <p>${message.content}</p>
        <p><strong>Next Steps:</strong> ${message.nextSteps}</p>
        <p>If you have any immediate questions, please don't hesitate to contact us.</p>
        <p>Best regards,<br>The NCHG Team</p>
      </div>
      <div class="footer">
        <p>NCHG - Next Generation Advanced Materials<br>
        Email: nick@nchg.co.uk | Website: nchg.co.uk</p>
      </div>
    </div>
  `;
}

function generateAdminEmailHTML(formType: string, formData: Record<string, any>): string {
  const formattedData = Object.entries(formData)
    .map(([key, value]) => {
      const label = key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());
      return `<tr><td style="padding: 8px; border: 1px solid #e5e7eb; font-weight: bold;">${label}</td><td style="padding: 8px; border: 1px solid #e5e7eb;">${value}</td></tr>`;
    })
    .join('');

  return `
    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 800px; margin: 0 auto;">
      <h2 style="color: #1e40af;">New ${formType.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())} Submission</h2>
      <p>A new form submission has been received. Please review the details below:</p>
      
      <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
        <thead>
          <tr style="background: #f9fafb;">
            <th style="padding: 12px; border: 1px solid #e5e7eb; text-align: left;">Field</th>
            <th style="padding: 12px; border: 1px solid #e5e7eb; text-align: left;">Value</th>
          </tr>
        </thead>
        <tbody>
          ${formattedData}
        </tbody>
      </table>
      
      <p style="margin-top: 30px;"><strong>Action Required:</strong> Please follow up with this prospect within 24 hours.</p>
      
      <hr style="margin: 30px 0; border: 1px solid #e5e7eb;">
      <p style="color: #6b7280; font-size: 14px;">This email was automatically generated from the NCHG website form submission system.</p>
    </div>
  `;
}

serve(handler);