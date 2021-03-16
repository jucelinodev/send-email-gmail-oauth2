import nodemailer from "nodemailer";

export default async (req, res) => {
  if (req.method !== "POST") {
    return res.status(400).json({ message: "Method invalid" });
  }
  const { name, email, message } = req.body;

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_PASS,
    },
  });

  try {
    const result = transporter.sendMail({
      from: process.env.GMAIL_USER,
      to: process.env.EMAIL_TO_TEST,
      subject: "API emails com Gmail",
      replyTo: email,
      html: `
      <p>Nome: ${name}<p/>
      </br>
      <p>Email: ${email}<p/>
      </br>
      <p>Mensagem: ${message}<p/>
      `,
    });

    if (!result.reject) {
      return res.status(202).json({ result });
    }
  } catch (error) {
    return res.status(500).json(error);
  }
};
