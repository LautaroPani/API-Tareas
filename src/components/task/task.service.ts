import { isValidObjectId } from "mongoose";
import { AppError } from "../../errors/AppError";
import { ITask, PRIORIDADES } from "./task.model";
import { taskRepository } from "./task.repository";

// Capa de servicio: acá viven las validaciones de negocio
const validarId = (id: string): void => {
  if (!isValidObjectId(id)) {
    throw new AppError("El id no es válido", 400);
  }
};

const validarTarea = (data: any): ITask => {
  const { titulo, prioridad = "media", fechaLimite, completada = false } = data ?? {};

  // Validación 1: el título es obligatorio
  if (typeof titulo !== "string" || titulo.trim() === "") {
    throw new AppError("El título es obligatorio", 400);
  }

  // Validación 2: la prioridad solo puede ser baja, media o alta
  if (!PRIORIDADES.includes(prioridad)) {
    throw new AppError(`La prioridad debe ser: ${PRIORIDADES.join(", ")}`, 400);
  }

  // Validación 3: la fecha límite es obligatoria, válida y no puede estar en el pasado
  const fecha = new Date(fechaLimite);
  if (!fechaLimite || isNaN(fecha.getTime())) {
    throw new AppError("La fecha límite es obligatoria y debe ser una fecha válida", 400);
  }
  const hoy = new Date();
  hoy.setUTCHours(0, 0, 0, 0);
  if (fecha < hoy) {
    throw new AppError("La fecha límite no puede estar en el pasado", 400);
  }

  if (typeof completada !== "boolean") {
    throw new AppError("El campo completada debe ser true o false", 400);
  }

  return { titulo: titulo.trim(), prioridad, fechaLimite: fecha, completada };
};

export const taskService = {
  getAll: () => taskRepository.findAll(),

  getById: async (id: string) => {
    validarId(id);
    const task = await taskRepository.findById(id);
    if (!task) throw new AppError("Tarea no encontrada", 404);
    return task;
  },

  create: (data: any) => taskRepository.create(validarTarea(data)),

  update: async (id: string, data: any) => {
    validarId(id);
    const task = await taskRepository.update(id, validarTarea(data));
    if (!task) throw new AppError("Tarea no encontrada", 404);
    return task;
  },

  remove: async (id: string) => {
    validarId(id);
    const task = await taskRepository.delete(id);
    if (!task) throw new AppError("Tarea no encontrada", 404);
    return task;
  },
};
