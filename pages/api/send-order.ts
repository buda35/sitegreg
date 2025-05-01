import type { NextApiRequest, NextApiResponse } from 'next';
import nodemailer from 'nodemailer';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Méthode non autorisée' });
  }

  const { firstName, lastName, request, email } = req.body;

  if (!firstName || !lastName || !request || !email) {
    return res.status(400).json({ message: 'Champs manquants' });
  }

  // Configurez votre transporteur SMTP ici (exemple avec Gmail)
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.SMTP_USER, // à définir dans .env.local
      pass: process.env.SMTP_PASS, // à définir dans .env.local
    },
  });

  try {
    await transporter.sendMail({
      from: email,
      to: 'budaberg35@gmail.com',
      subject: 'Nouvelle demande de commande via le site',
      text: `Nom: ${lastName}\nPrénom: ${firstName}\nEmail: ${email}\n\nNature de la demande:\n${request}`,
    });
    return res.status(200).json({ message: 'Message envoyé' });
  } catch (error) {
    return res.status(500).json({ message: 'Erreur lors de l\'envoi du mail' });
  }
} 