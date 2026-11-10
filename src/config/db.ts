import mongoose from "mongoose"; 
// Función para conectar a la base de datos MongoDB usando Mongoose
export const connectDB = async (): Promise<void> => { // Función asíncrona que devuelve una promesa de tipo void
  const uri = process.env.MONGO_URI; // Obtiene la URI de conexión a MongoDB desde las variables de entorno
  if (!uri) {
    throw new Error("Falta la variable de entorno MONGO_URI"); // Lanza un error si la variable de 
    //entorno MONGO_URI no está definida
  }
  await mongoose.connect(uri); // Conecta a la base de datos MongoDB usando la URI proporcionada
  console.log("Conectado a MongoDB");
};
