import nodemailer from 'nodemailer';

export const sendEmail=async(to,html)=>{
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
    html
  });
}