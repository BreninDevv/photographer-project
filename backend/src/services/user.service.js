import { prisma } from "../lib/prisma.js";

class UserService {
  async createUser(data) {
    const { name, email, password } = data;

    if (!name || !email || !password) {
      throw new Error("Nome, email e senha são obrigatórios!");
    }

    const emailExists = await prisma.user.findUnique({
      where: { email },
    });

    if (emailExists) {
      throw new Error("Usuário já existe!");
    }

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password,
      },
    });
    return user;
  }
  async listUsers() {
    return await prisma.user.findMany({
      orderBy: { createdAt: "desc" },
    });
  }
  async getUserById(userId) {
    if (!userId) {
      throw new Error("Id é obrigatório!");
    }
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });
    if (!user) {
      throw new Error("Usuário não encontrado!");
    }
    return user;
  }
}
