import "dotenv/config";
import app from "./app";
import { connectDB } from "./config/db";

const PORT = process.env.PORT || 3000; // Puerto en el que el servidor escuchará las solicitudes

const start = async (): Promise<void> => { // Función asíncrona para iniciar el servidor
  try { // Intenta conectar a la base de datos y luego iniciar el servidor
    await connectDB(); // Conecta a la base de datos
    app.listen(PORT, () => { // Inicia el servidor y escucha en el puerto especificado
      console.log(`Servidor escuchando en http://localhost:${PORT}`);
    });
  } catch (error) { // Si ocurre un error durante la conexión a la base de datos o al iniciar el servidor,
  //se captura aquí
    console.error("No se pudo iniciar el servidor:", error); // Muestra un mensaje de error en la consola
    process.exit(1); // Sale del proceso con un código de error 1, indicando que hubo un fallo al iniciar el servidor
  }
};

start(); // para iniciar el servidor y conectar a la base de datos
