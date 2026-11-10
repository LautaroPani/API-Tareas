# API de lista de tareas

API REST con Node.js, Express, TypeScript y MongoDB (Mongoose).

## Instalación ✅

1. Clonar el repositorio e instalar dependencias: `npm install` 
2. Copiar `.env.example` a `.env` y completar los valores (`MONGO_URI` y `PORT`). 
3. Ejecutar en desarrollo: `npm run dev` 

## Endpoints (tareas) ✅

| Método | Ruta             | Descripción             |
|--------|------------------|------------------------ |
| GET    | /api/tasks       | Listar todas las tareas |
| GET    | /api/tasks/:id   | Obtener una tarea       |
| POST   | /api/tasks       | Crear una tarea         |
| PUT    | /api/tasks/:id   | Actualizar una tarea    |
| DELETE | /api/tasks/:id   | Eliminar una tarea      |

Body de ejemplo (POST y PUT): 

```json
{
  "titulo": "Lavar los platos",
  "descripcion": "Lavar toda la vajilla acumulada del almuerzo y limpiar la mesada",
  "completada": false,
  "fechaLimite": "2026-11-11"
}
```

(Pendiente de semana 2: registro, login y rutas protegidas.)
