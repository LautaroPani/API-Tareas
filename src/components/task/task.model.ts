import { Schema, model } from "mongoose"; // Importa Schema y model de Mongoose para definir el esquema y el modelo de la tarea

export const PRIORIDADES = ["baja", "media", "alta"] as const;
export type Prioridad = (typeof PRIORIDADES)[number];

export interface ITask {
  titulo: string;
  prioridad: Prioridad;
  fechaLimite: Date;
  completada: boolean;
}

const taskSchema = new Schema<ITask>( // Define el esquema de la tarea con sus propiedades y validaciones
  {
    titulo: { type: String, required: true, trim: true },
    prioridad: { type: String, enum: PRIORIDADES, default: "media" },
    fechaLimite: { type: Date, required: true },
    completada: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export const Task = model<ITask>("Task", taskSchema);
