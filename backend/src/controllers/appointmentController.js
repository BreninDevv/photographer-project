import appointmentService from "../services/appointment.service.js";

class AppointmentController {
  async createController(req, res) {
    try {
      const userId = req.userId;
      const { planId, date } = req.body;

      const appointment = await appointmentService.createService({
        userId,
        planId,
        date,
      });

      res.status(201).json(appointment);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async listAllController(req, res) {
    try {
      const list = await appointmentService.listAll();
      res.status(200).json(list);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async listUserController(req, res) {
    try {
      const userId = req.userId;

      const userAppointment = await appointmentService.listByUser(userId);
      res.status(200).json(userAppointment);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async updateStatusController(req, res) {
    try {
      const { id } = req.params;
      const { status } = req.body;

      const updatedAppoinment = await appointmentService.updateStatus(
        id,
        status,
      );
      res.status(200).json(updatedAppoinment);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
}

export default new AppointmentController();
