import express, { NextFunction, Request, Response } from "express";
import taskRoutes from "./components/task/task.routes";

const app = express();

app.use(express.json());
app.use("/api/tasks", taskRoutes);

// Ruta inexistente
app.use((_req: Request, res: Response) => {
  res.status(404).json({ message: "Ruta no encontrada" });
});

// Errores generales (por ejemplo, un JSON mal formado en el body)
app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
  if (err.type === "entity.parse.failed") {
    res.status(400).json({ message: "El JSON enviado no es válido" });
    return;
  }
  console.error(err);
  res.status(500).json({ message: "Error interno del servidor" });
});

export default app;
