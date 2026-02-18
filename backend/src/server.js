import app from "./app.js";
import dotenv from "dotenv";

dotenv.config();

const PORT = process.env.PORT || 3434;

app.listen(PORT, () => {
  console.log(`Servidor ligado na porta: ${PORT}`);
});
