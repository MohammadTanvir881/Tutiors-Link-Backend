
import nodemailer from "nodemailer";
import config from "../app/config";

export const sendEmail = async (to: string, text: string, html: string) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: config.node_env === "production", // true for port 465, false for other ports
    auth: {
      user: "tanvirrashid881@gmail.com",
      pass: "tvdt vnfx okmk xavs",
    },
  });

  // send mail with defined transport object
  const info = await transporter.sendMail({
    from: "tanvirrashid881@gmail.com", // sender address
    to, // list of receivers
    subject: "Request For Tutor", // Subject line
    text, // plain text body
    html, // html body
  });

  // console.log("Message sent: %s", info.messageId);
};
