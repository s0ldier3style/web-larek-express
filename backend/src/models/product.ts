import exp from "constants";
import mongoose, { Schema, Document } from "mongoose";

export interface IFile {
  fileName: string;
  originalName: string;
}

interface IProduct extends Document {
  title: string;
  image: IFile;
  category: string;
  description: string;
  price?: number | null;
}

const ProductSchema: Schema<IProduct> = new Schema<IProduct>(
  {
    title: {
      type: String,
      required: [true, "Поле title должно быть заполнено"],
      unique: true,
      minlength: [2, "Минимальная длина поля title - 2 символа"],
      maxlength: [30, "Максимальная длина поля title - 30 символа"],
    },
    image: {
      fileName: {
        type: String,
        required: [true, "Поле filename должно быть заполнено"],
      },
      originalName: {
        type: String,
        required: [true, "Поле originalName должно быть заполнено"],
      },
    },
    category: {
      type: String,
      required: [true, "Поле category должно быть заполнено"],
    },
    description: {
      type: String,
      default: "",
    },
    price: {
      type: Number,
      default: null,
      validate: {
        validator: (value: number | null) => value === null || value >= 0,
        message: "Цена не может быть отрицательной",
      },
    },
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model<IProduct>("product", ProductSchema);

export default Product;
