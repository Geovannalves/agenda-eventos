// pages/api/login.ts
import type { NextApiRequest, NextApiResponse } from 'next';

interface LoginRequest extends NextApiRequest {
  body: {
    email: string;
    password: string;
  };
}

export default function handler(req: LoginRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { email, password } = req.body;

    if (email === 'geo@gmail.com' && password === 'geo') {
      res.status(200).json({ message: 'Login bem-sucedido' });
    } else {
      res.status(401).json({ message: 'Credenciais inválidas' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Método ${req.method} não permitido`);
  }
}
