export const getOtpHtml = (otp) => {
  return `
    <div style="
      font-family: Arial, sans-serif;
      max-width: 600px;
      margin: 0 auto;
      padding: 40px 20px;
      background: #f8fafc;
      color: #111827;
    ">

      <div style="
        background: #ffffff;
        border: 1px solid #e5e7eb;
        border-radius: 16px;
        padding: 40px 32px;
        text-align: center;
      ">

        <div style="
          margin-bottom: 24px;
          font-size: 24px;
          font-weight: 700;
          color: #111827;
        ">
          E-Commerce
        </div>

        <h1 style="
          margin: 0 0 12px;
          font-size: 28px;
          font-weight: 700;
          color: #111827;
        ">
          Verify your account
        </h1>

        <p style="
          margin: 0 auto 28px;
          max-width: 440px;
          font-size: 15px;
          line-height: 1.6;
          color: #6b7280;
        ">
          Thanks for creating your account. Use the verification code
          below to complete your registration.
        </p>

        <div style="
          display: inline-block;
          padding: 18px 28px;
          background: #f3f4f6;
          border-radius: 12px;
          border: 1px solid #e5e7eb;
          font-size: 32px;
          letter-spacing: 8px;
          font-weight: 700;
          color: #111827;
        ">
          ${otp}
        </div>

        <p style="
          margin: 24px 0 0;
          font-size: 14px;
          color: #6b7280;
        ">
          This code expires in <strong>10 minutes</strong>.
        </p>

      </div>

      <div style="
        margin-top: 24px;
        text-align: center;
        font-size: 13px;
        line-height: 1.6;
        color: #9ca3af;
      ">
        <p style="margin: 0 0 6px;">
          If you didn't create this account, you can safely ignore this email.
        </p>

        <p style="margin: 0;">
          © E-Commerce API
        </p>
      </div>

    </div>
  `;
};