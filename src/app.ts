import express, { NextFunction, Request, Response } from "express";
import taskRoutes from "./components/task/task.routes";

const app = express();

//Middlewares
app.use(express.json());            //Permite recibir datos en formato JSON
app.use("/api/tasks", taskRoutes); //Conecta las rutas de tareas

// Ruta inexistente
app.use((_req: Request, res: Response) => {                 // Maneja rutas no encontradas
  res.status(404).json({ message: "Ruta no encontrada" }); // Respuesta con estado 404 y mensaje de error
});

// Errores generales (por ejemplo, un JSON mal formado en el body)
app.use((err: any, _req: Request, res: Response, _next: NextFunction) => { //Middleware de manejo de errores de Express
  if (err.type === "entity.parse.failed") { //Condición que detecta si hubo un error específico de sintaxis
    res.status(400).json({ message: "El JSON enviado no es válido" });
    return;
  }
  console.error(err);
  res.status(500).json({ message: "Error interno del servidor" }); // Respuesta con estado 500 y mensaje de error
});

export default app; // Exporta la aplicación Express para que pueda ser utilizada en otros módulos
