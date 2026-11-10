import { Router } from "express";
import { taskController } from "./task.controller";

const router = Router(); // Crea un enrutador de Express para manejar las rutas relacionadas
//con las tareas

router.get("/", taskController.getAll); // Ruta para obtener todas las tareas
router.get("/:id", taskController.getById); // Ruta para obtener una tarea específica por su ID
router.post("/", taskController.create); // Ruta para crear una nueva tarea
router.put("/:id", taskController.update); // Ruta para actualizar una tarea existente por su ID
router.delete("/:id", taskController.remove); // Ruta para eliminar una tarea específica por su ID

export default router;
