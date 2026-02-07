import userService from "../services/user.service.js";

class UserController {
  async create(req, res) {
    try {
      const user = await userService.createUser(req.body);
      res.status(201).json(user);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
  async list(req, res) {
    try {
      const users = await userService.listUsers();
      res.status(200).json(users);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
  async getUser(req, res) {
    try {
      const user = await userService.getUserById(req.params.id);
      res.status(200).json(user);
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  }
  async updateUser(req, res) {
    try {
      const user = await userService.updateUserById(req.params.id, req.body);
      res.status(200).json(user);
    } catch (error) {
      res.status(409).json({ error: error.message });
    }
  }
  async deleteUser(req, res) {
    try {
      const result = await userService.deleteUserById(req.params.id);
      res.status(200).json(result);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
}

export default new UserController();
