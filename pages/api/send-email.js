import { transporter } from "../../services/email/transporter";

export default async (req, res) => {
  if (req.method !== "POST") {
    return res.status(400).json({ message: "Metodo HTTP inválido." });
  }
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res
      .status(400)
      .json({ message: "name, email e message são obrigátorios." });
  }

  try {
    const result = transporter.sendMail({
      from: process.env.GMAIL_USER,
      to: email,
      subject: "Envio de Email Jucelino Novais",
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
      return res.status(202).json({ message: "Email enviado com sucesso!" });
    }
  } catch (error) {
    return res.status(500).json(error);
  }
};
