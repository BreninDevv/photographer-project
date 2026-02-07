import planService from "../services/plan.service.js";

class PlanController {
  async create(req, res) {
    try {
      const plan = await planService.createPlan(req.body);
      res.status(201).json(plan);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
  async deactivate(req, res) {
    try {
      const plan = await planService.deactivatePlan(req.params.id);
      res.status(200).json(plan);
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  }
  async activate(req, res) {
    try {
      const plan = await planService.activatePlan(req.params.id);
      res.status(200).json(plan);
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  }
  async updatePlan(req, res) {
    try {
      const plan = await planService.updatePlanById(req.params.id, req.body);
      res.status(200).json(plan);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
}

export default new PlanController();
