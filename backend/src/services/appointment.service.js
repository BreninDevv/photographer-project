import { addHours, isBefore } from "date-fns";
import { prisma } from "../lib/prisma";

class AppointmentService {
  async createService({ userId, planId, date }) {
    const plan = await prisma.plan.findUnique({
      where: { id: planId },
    });

    if (!plan) {
      throw new Error("O plano selecionado não existe.");
    }

    if (!plan.isActive) {
      throw new Error("O plano selecionado está desativado no momento.");
    }

    const startDate = new Date(date);
    const endDate = addHours(startDate, plan.duration);

    if (isBefore(startDate, new Date())) {
      throw new Error("Não é possível agendar em uma data passada.");
    }

    const conflict = await prisma.appointment.findFirst({
      where: {
        status: { not: "CANCELED" },
        OR: [
          {
            AND: [{ date: { lte: startDate } }, { endDate: { gt: startDate } }],
          },
          {
            AND: [{ date: { lt: endDate } }, { endDate: { gte: endDate } }],
          },
        ],
      },
    });

    if (conflict) {
      throw new Error(
        "O fotógrafo já possui um ensaio agendado neste intervalo de tempo.",
      );
    }

    const appointment = await prisma.appointment.create({
      data: {
        userId,
        planId,
        date: startDate,
        endDate: endDate,
        status: "PENDING",
      },
      include: {
        plan: true,
        user: {
          select: { name: true, email: true },
        },
      },
    });
    return appointment;
  }

  async listAll() {
    return await prisma.appointment.findMany({
      orderBy: { date: "asc" },
      include: { plan: true, user: true },
    });
  }

  async listByUser(userId) {
    return await prisma.appointment.findMany({
      where: { userId },
      include: { plan: true },
    });
  }
}

export default new AppointmentService();
