import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendVerificationEmail = async (
    email: string,
    token: string,
    name: string
) => {
    // Generating a confirmation link which is sent to the user
    const confirmationLink = `${process.env.NEXT_PUBLIC_APP_URL}/auth/new-verification?token=${token}`;

    // Sending the email
    await resend.emails.send({
        from: `Snippets <mail@graffixapp.com>`,
        to: email,
        subject: "Verify your email for Snippets",
        html: `<!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Verify Your Email</title>
          <style>
            body { 
              font-family: Arial, sans-serif;
              line-height: 1.6;
              color: #333;
              max-width: 600px;
              margin: 0 auto;
              padding: 20px;
            }
            .button {
              display: inline-block;
              padding: 12px 24px;
              background-color: #007bff;
              color: white;
              text-decoration: none;
              border-radius: 4px;
              margin: 20px 0;
            }
            .footer {
              margin-top: 30px;
              font-size: 0.9em;
              color: #666;
            }
          </style>
        </head>
        <body>
          <h2>Welcome to Snippets!</h2>
          <p>Hello ${name ? name : "there"},</p>
          <p>Thank you for signing up. Please verify your email address by clicking the button below:</p>
          
          <a href="${confirmationLink}" class="button">Verify Email Address</a>
          
          <p>If the button doesn't work, you can copy and paste this link into your browser:</p>
          <p>${confirmationLink}</p>
          
          <div class="footer">
            <p>If you didn't create an account with us, you can safely ignore this email.</p>
            <p>This verification link will expire in 24 hours.</p>
          </div>
        </body>
      </html>`,
        // Optional text version for email clients that don't support HTML
        text: `Welcome to Snippets! Please verify your email address by visiting: ${confirmationLink}`,
    });
};
