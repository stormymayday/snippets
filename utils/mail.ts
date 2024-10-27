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
              color: white !important;
              text-decoration: none;
              border-radius: 4px;
              margin: 20px 0;
            }
            .footer {
              margin-top: 30px;
              font-size: 0.9em;
              color: #666;
            }
            .warning {
              background-color: #fff3cd;
              border: 1px solid #ffeeba;
              color: #856404;
              padding: 12px;
              border-radius: 4px;
              margin: 20px 0;
            }
            .logo {
              margin-bottom: 20px;
              text-align: center;
            }
            .logo img {
              max-width: 150px;
              height: auto;
            }
            .welcome-text {
              text-align: center;
              margin-bottom: 30px;
            }
            .action-needed {
              background-color: #e8f4fd;
              border: 1px solid #bee5eb;
              color: #0c5460;
              padding: 12px;
              border-radius: 4px;
              margin: 20px 0;
            }
          </style>
        </head>
        <body>
          <div class="logo">
            <h2>Welcome to Snippets!</h2>
          </div>

          <div class="welcome-text">
            <h3>Hello ${name ? name : "there"}!</h3>
            <p>Thank you for joining Snippets. We're excited to have you on board.</p>
          </div>

          <div class="action-needed">
            <strong>Action Required:</strong>
            <p>To ensure the security of your account and get started with Snippets, please verify your email address:</p>
          </div>
          
          <center>
            <a href="${confirmationLink}" class="button">Verify Email Address</a>
          </center>
          
          <p>If the button above doesn't work, you can copy and paste this link into your browser:</p>
          <p>${confirmationLink}</p>

          <div class="warning">
           <strong>Please Note:</strong>
           <ul>
            <li>This verification link will expire in 1 hour.</li>
            <li>If you need a new verification link, please visit the sign-in page and request another one.</li>
           </ul>
         </div>
          
          <div class="footer">
            <p>This email was sent by Snippets in response to your account creation.</p>
            <p>If you didn't create an account with us, you can safely ignore this email.</p>
            <hr style="border: 1px solid #eee; margin: 20px 0;">
            <small>
              Snippets - Making code sharing easier
            </small>
          </div>
        </body>
      </html>`,
        text: `Welcome to Snippets!
              Hello ${name ? name : "there"}!
              Thank you for joining Snippets. We're excited to have you on board.
              To ensure the security of your account and get started with Snippets, please verify your email address by visiting: ${confirmationLink}
              Please note: This verification link will expire in 1 hour.
              If you didn't create an account with us, you can safely ignore this email.
              Snippets - Making code sharing easier`,
    });
};

export const sendPasswordResetEmail = async (
    email: string,
    token: string,
    name: string
) => {
    // Generating a password reset link
    const passwordResetLink = `${process.env.NEXT_PUBLIC_APP_URL}/auth/new-password?token=${token}`;

    // Sending the email
    await resend.emails.send({
        from: `Snippets <mail@graffixapp.com>`,
        to: email,
        subject: "Reset your password for Snippets",
        html: `<!DOCTYPE html>
     <html>
       <head>
         <meta charset="utf-8">
         <meta name="viewport" content="width=device-width, initial-scale=1.0">
         <title>Reset Your Password</title>
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
             color: white !important;
             text-decoration: none;
             border-radius: 4px;
             margin: 20px 0;
           }
           .footer {
             margin-top: 30px;
             font-size: 0.9em;
             color: #666;
           }
           .warning {
             background-color: #fff3cd;
             border: 1px solid #ffeeba;
             color: #856404;
             padding: 12px;
             border-radius: 4px;
             margin: 20px 0;
           }
           .logo {
             margin-bottom: 20px;
             text-align: center;
           }
           .logo img {
             max-width: 150px;
             height: auto;
           }
           .welcome-text {
             text-align: center;
             margin-bottom: 30px;
           }
           .action-needed {
             background-color: #e8f4fd;
             border: 1px solid #bee5eb;
             color: #0c5460;
             padding: 12px;
             border-radius: 4px;
             margin: 20px 0;
           }
         </style>
       </head>
       <body>
         <div class="logo">
           <h2>Snippets Password Reset</h2>
         </div>

         <div class="welcome-text">
           <h3>Hello ${name ? name : "there"}!</h3>
           <p>We received a request to reset password for your Snippets account.</p>
         </div>

         <div class="action-needed">
           <strong>Action Required:</strong>
           <p>To reset your password, please click the button below:</p>
         </div>
         
         <center>
           <a href="${passwordResetLink}" class="button">Reset Password</a>
         </center>
         
         <p>If the button above doesn't work, you can copy and paste this link into your browser:</p>
         <p>${passwordResetLink}</p>
         
         <div class="warning">
           <strong>Please Note:</strong>
           <ul>
            <li>This password reset link will expire in 1 hour.</li>
            <li>If you didn't request this password reset, please ignore this email.</li>
           </ul>
         </div>
         
         <div class="footer">
           <p>This email was sent by Snippets in response to your password reset request.</p>
           <hr style="border: 1px solid #eee; margin: 20px 0;">
           <small>
             Snippets - Making code sharing easier
           </small>
         </div>
       </body>
     </html>`,
        text: `Snippets Password Reset
              Hello ${name ? name : "there"}!
              We received a request to reset  password for your Snippets account.
              Please visit the following link to reset your password: ${passwordResetLink}
              NOTICE:
              This password reset link will expire in 1 hour.
              If you didn't request this password reset, please ignore this email.
              Snippets - Making code sharing easier`,
    });
};
