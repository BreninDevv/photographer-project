import jwt from "jsonwebtoken";
import { prisma } from "../lib/prisma.js";

export async function authMiddleware(req, res, next) {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({ message: "Token não fornecido!" });
    }

    const parts = authHeader.split(" ");

    if (parts.length !== 2) {
      return res.status(401).json({ message: "Formato de token inválido!" });
    }

    const [scheme, token] = parts;

    if (!/^Bearer$/i.test(scheme)) {
      return res.status(401).json({ message: "Token mal formatado!" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await prisma.user.findUnique({
      where: { id: decoded.id },
    });
    if (!user) {
      return res.status(401).json({ message: "Usuário não encontrado!" });
    }

    req.user = user;

    return next();
  } catch (error) {
    return res.status(401).json({ message: "Token inválido ou expirado!" });
  }
}
