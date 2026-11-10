import { Request, Response } from "express";
import { AppError } from "../../errors/AppError";
import { taskService } from "./task.service";

// Si el error es de negocio devolvemos su código; cualquier otro es un 500
const manejarError = (error: unknown, res: Response): void => {
  if (error instanceof AppError) {
    res.status(error.statusCode).json({ message: error.message });
    return;
  }
  console.error(error);
  res.status(500).json({ message: "Error interno del servidor" });
};

export const taskController = {
  getAll: async (_req: Request, res: Response): Promise<void> => {
    try {
      const tasks = await taskService.getAll();
      res.status(200).json(tasks);
    } catch (error) {
      manejarError(error, res);
    }
  },

  getById: async (req: Request, res: Response): Promise<void> => {
    try {
      const task = await taskService.getById(req.params.id);
      res.status(200).json(task);
    } catch (error) {
      manejarError(error, res);
    }
  },

  create: async (req: Request, res: Response): Promise<void> => {
    try {
      const task = await taskService.create(req.body);
      res.status(201).json(task);
    } catch (error) {
      manejarError(error, res);
    }
  },

  update: async (req: Request, res: Response): Promise<void> => {
    try {
      const task = await taskService.update(req.params.id, req.body);
      res.status(200).json(task);
    } catch (error) {
      manejarError(error, res);
    }
  },

  remove: async (req: Request, res: Response): Promise<void> => {
    try {
      await taskService.remove(req.params.id);
      res.status(200).json({ message: "Tarea eliminada correctamente" });
    } catch (error) {
      manejarError(error, res);
    }
  },
};
