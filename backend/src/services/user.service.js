import { prisma } from "../lib/prisma.js";

class UserService {
  async createUser(data) {
    const { name, email, password } = data;

    if (!name || !email || !password) {
      throw new Error("Nome, email e senha são obrigatórios!");
    }
    const userExists = await prisma.user.findUnique({
      where: { email },
    });
    if (userExists) {
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
    const userExists = await prisma.user.findUnique({
      where: { id: userId },
    });
    if (!userExists) {
      throw new Error("Usuário não encontrado!");
    }
    return userExists;
  }
  async updateUserById(userId, data) {
    if (!userId) {
      throw new Error("Id é obrigatório!");
    }
    const userExists = await prisma.user.findUnique({
      where: { id: userId },
    });
    if (!userExists) {
      throw new Error("Usuário não encontrado!");
    }
    const { name, email, password } = data;

    if (email && email !== userExists.email) {
      const emailInUse = await prisma.user.findUnique({
        where: { email },
      });
      if (emailInUse) {
        throw new Error("Email já está em uso!");
      }
    }
    return await prisma.user.update({
      where: { id: userId },
      data: { name, email, password },
    });
  }
  async deleteUserById(userId) {
    if (!userId) {
      throw new Error("Id é obrigatório!");
    }
    const userExists = await prisma.user.findUnique({
      where: { id: userId },
    });
    if (!userExists) {
      throw new Error("Usuário não encontrado!");
    }

    await prisma.user.delete({
      where: { id: userId },
    });

    return { message: "Usuário deletado com sucesso!" };
  }
}

export default new UserService();
