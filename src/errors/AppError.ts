// Error propio para devolver el código de estado correcto desde el servicio
export class AppError extends Error {
  constructor(message: string, public statusCode: number = 400) {
    super(message);
    this.name = "AppError";
  }
}
