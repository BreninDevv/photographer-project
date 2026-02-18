import { addHours, addMinutes, subMinutes, isBefore } from "date-fns";
import { prisma } from "../lib/prisma.js";

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

    const BUFFER_MINUTES = 60;
    const startWithBuffer = subMinutes(startDate, BUFFER_MINUTES);
    const endWithBuffer = addMinutes(endDate, BUFFER_MINUTES);

    if (isBefore(startDate, new Date())) {
      throw new Error("Não é possível agendar em uma data passada.");
    }
    const conflict = await prisma.appointment.findFirst({
      where: {
        status: { not: "CANCELED" },
        OR: [
          {
            AND: [
              { date: { lte: startDate } },
              { endDate: { gt: startWithBuffer } },
            ],
          },
          {
            AND: [
              { date: { lt: endWithBuffer } },
              { endDate: { gte: endDate } },
            ],
          },
        ],
      },
    });

    if (conflict) {
      throw new Error(
        "Horário indisponível. O fotógrafo precisa de 1 hora de intervalo entre ensaios para deslocamento.",
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

  async updateStatus(id, status) {
    const validStatuses = ["PENDING", "CONFIRMED", "CANCELED", "COMPLETED"];

    if (!validStatuses.includes(status)) {
      throw new Error("Status inválido.");
    }

    const appointment = await prisma.appointment.findUnique({ where: { id } });
    if (!appointment) {
      throw new Error("Agendamento não encontrado.");
    }

    return await prisma.appointment.update({
      where: { id },
      data: { status },
      include: { plan: true, user: { select: { name: true } } },
    });
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
