import { Request, Response, NextFunction } from "express";

interface ICustomError extends Error {
  statusCode?: number;
}

const errorHandler = (
  error: ICustomError,
  _req: Request,
  res: Response,
  next: NextFunction
): void => {
  const statusCode = error.statusCode || 500;
  const message = error.message || "Внутренняя ошибка сервера";

  res.status(statusCode).json({ message });
};

export default errorHandler;
