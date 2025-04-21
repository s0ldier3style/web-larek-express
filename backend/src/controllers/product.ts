import { Request, Response, NextFunction } from "express";
import BadRequestError from "../errors/badRequestError";
import NotFoundError from "../errors/notFoundError";
import ConflictError from "../errors/conflictError";
import Product from "../models/product";

export const getAllProducts = async (
  _req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const products = await Product.find();
    res.status(200).json({
      items: products,
      total: products.length,
    });
  } catch (error: any) {
    next(error);
  }
};

export const createProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { title, image, category, description, price } = req.body;

    const newProduct = new Product({
      title,
      image,
      category,
      description,
      price,
    });

    const savedProduct = await newProduct.save();
    return res.status(201).json(savedProduct);
  } catch (error: any) {
    if (error instanceof Error && error.message.includes("E11000")) {
      return next(new ConflictError("Товар с таким названием уже существует"));
    }
    if (error.name === "ValidationError") {
      return next(
        new BadRequestError("Ошибка валидации данных при создании товара")
      );
    }

    return next(error);
  }
};

export async function getProductById(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return next(new NotFoundError("Товар не найден"));
    }

    return res.status(200).json({
      id: product._id,
      description: product.description,
      image: product.image.fileName,
      title: product.title,
      category: product.category,
      price: product.price,
    });
  } catch (error: any) {
    return next(error);
  }
}
