import authService from "../services/auth.service.js";

class AuthController {
  async login(req, res) {
    try {
      const result = await authService.login(req.body);
      return res.status(200).json(result);
    } catch (error) {
      return res.status(401).json({ error: error.message });
    }
  }
}

export default new AuthController();
