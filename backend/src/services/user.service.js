import prisma from "../lib/prisma";

class UserService {
  async createUser(name, email, password) {
    if (!name || !email || !password) {
      throw new Error("Nome, email e senha são obrigatórios!");
    }

    const userExists = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    if (userExists) {
      throw new Error("Usuário já existe!");
    }

    const user = prisma.user.create({
      data: {
        name,
        email,
        password,
      },
    });

    return user;
  }
}

export default new UserService();
