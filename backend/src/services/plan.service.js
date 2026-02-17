import { prisma } from "../lib/prisma.js";

class PlanService {
  async createPlan(data) {
    const { name, price, duration, description } = data;
    if (!name || price == null || duration == null || !description) {
      throw new Error("Preencha os dados obrigatórios para criar o plano!");
    }
    if (price <= 0) {
      throw new Error("Preço tem que ser maior que 0!");
    }
    if (duration <= 0) {
      throw new Error("Duração tem que ser maior que 0!");
    }

    const planExists = await prisma.plan.findUnique({
      where: { name },
    });

    if (planExists) {
      throw new Error("Esse plano já existe!");
    }

    const plan = await prisma.plan.create({
      data: { name, price, duration, description },
    });
    return plan;
  }
  async deactivatePlan(planId) {
    if (!planId) {
      throw new Error("Id é obrigatório!");
    }
    const plan = await prisma.plan.findUnique({
      where: { id: planId },
    });
    if (!plan) {
      throw new Error("Plano não encontrado!");
    }
    if (!plan.isActive) {
      throw new Error("o Plano já está inativo!");
    }

    return await prisma.plan.update({
      where: { id: planId },
      data: { isActive: false },
    });
  }
  async activatePlan(planId) {
    const plan = await prisma.plan.findUnique({
      where: { id: planId },
    });
    if (!plan) {
      throw new Error("Plano não encontrado!");
    }
    if (plan.isActive) {
      throw new Error("o Plano já está ativo!");
    }

    return await prisma.plan.update({
      where: { id: planId },
      data: { isActive: true },
    });
  }
  async updatePlanById(planId, data) {
    if (!planId) {
      throw new Error("Id é obrigatório!");
    }
    const planExists = await prisma.plan.findUnique({
      where: { id: planId },
    });
    if (!planExists) {
      throw new Error("Plano não encontrado!");
    }
    const { name, price, duration, description } = data;

    if (name && name !== planExists.name) {
      const nameInUse = await prisma.plan.findUnique({
        where: { name },
      });
      if (nameInUse) {
        throw new Error("Já existe um plano com esse nome!");
      }
    }

    if (price != null && price <= 0) {
      throw new Error("Preço tem que ser maior que 0!");
    }
    if (duration != null && duration <= 0) {
      throw new Error("Duração tem que ser maior que 0!");
    }
    return await prisma.plan.update({
      where: { id: planId },
      data: { name, price, duration, description },
    });
  }
}

export default new PlanService();
