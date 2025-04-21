import { Request, Response, NextFunction } from "express";
import { faker } from "@faker-js/faker";
import BadRequestError from "../errors/badRequestError";
import Product from "../models/product";

export default async function createOrder(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { total, items } = req.body;

    const products = await Product.find({
      _id: { $in: items },
      price: { $ne: null },
    });
    if (products.length !== items.length) {
      return next(
        new BadRequestError("Некоторые товары отсутствуют или не продаются.")
      );
    }

    const finalTotal = products.reduce(
      (acc, product) => acc + (product.price || 0),
      0
    );
    if (finalTotal !== total) {
      return next(
        new BadRequestError("Стоимость товаров не совпадает с общей суммой.")
      );
    }

    const orderId = faker.string.uuid();

    return res.status(201).json({
      id: orderId,
      total: finalTotal,
    });
  } catch (error) {
    return next(error);
  }
}
