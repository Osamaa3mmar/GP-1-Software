import nodemailer from 'nodemailer';

export const sendEmail=async(to)=>{
const transporter = nodemailer.createTransport({
   service:'gmail',
    auth: {
      user: "osama1111222@gmail.com",
      pass: "wxxo lshy ktws ktks",
    },
  });




  const info = await transporter.sendMail({
    from: '"Thuraa" <osama1111222@gmail.com>',
    to, 
    subject: "Confirm Your Email",
    html: `
        <div style="font-family: Arial, sans-serif; text-align: center; padding: 20px;">
            <h2 style="color: #333;">Welcome to Thuraa!</h2>
            <p>Please confirm your email address by clicking the button below.</p>
            <a href="" style="display: inline-block; padding: 10px 20px; color: white; background-color: #007bff; text-decoration: none; border-radius: 5px;">Confirm Email</a>
            <p>If you didn't sign up for this account, you can ignore this email.</p>
        </div>
    `,
  });
}