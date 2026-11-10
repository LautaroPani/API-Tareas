import { Task, ITask } from "./task.model";

// Capa de acceso a datos: es la única que habla con Mongoose
export const taskRepository = {
  findAll: () => Task.find(),
  findById: (id: string) => Task.findById(id),
  create: (data: ITask) => Task.create(data),
  update: (id: string, data: ITask) =>
    Task.findByIdAndUpdate(id, data, { new: true, runValidators: true }),
  delete: (id: string) => Task.findByIdAndDelete(id),
};
