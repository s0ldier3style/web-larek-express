import { celebrate, Joi, Segments } from "celebrate";

export const validateProductCreation = celebrate({
  [Segments.BODY]: Joi.object().keys({
    title: Joi.string().min(2).max(30).required().messages({
      "string.empty": 'Поле "title" должно быть заполнено',
      "string.min": 'Минимальная длина поля "title" — 2 символа',
      "string.max": 'Максимальная длина поля "title" — 30 символов',
    }),
    image: Joi.object()
      .keys({
        fileName: Joi.string().required().messages({
          "string.empty": 'Поле "fileName" должно быть заполнено',
        }),
        originalName: Joi.string().required().messages({
          "string.empty": 'Поле "originalName" должно быть заполнено',
        }),
      })
      .required(),
    category: Joi.string().required().messages({
      "string.empty": 'Поле "category" должно быть заполнено',
    }),
    description: Joi.string().optional(),
    price: Joi.number().allow(null).min(0).messages({
      "number.min": "Цена не может быть отрицательной",
    }),
  }),
});

export const validateProductId = celebrate({
  [Segments.PARAMS]: Joi.object().keys({
    id: Joi.string().hex().length(24).required().messages({
      "string.length": "Некорректный формат id",
      "string.hex": "id должно быть в формате hex",
    }),
  }),
});

export const validateOrderCreation = celebrate({
  [Segments.BODY]: Joi.object().keys({
    payment: Joi.string().valid("card", "online").required().messages({
      "any.only": 'Оплата должна быть "card" или "online"',
      "string.empty": 'Поле "payment" должно быть заполнено',
    }),
    email: Joi.string().email().required().messages({
      "string.email": "Неправильный формат email",
      "string.empty": 'Поле "email" должно быть заполнено',
    }),
    phone: Joi.string()
      .pattern(/^\+\d{11}$/)
      .required()
      .messages({
        "string.pattern.base":
          "Номер телефона должен быть в формате +7XXXXXXXXXX",
        "string.empty": 'Поле "phone" должно быть заполнено',
      }),
    address: Joi.string().required().messages({
      "string.empty": 'Поле "address" должно быть заполнено',
    }),
    total: Joi.number().min(0).required().messages({
      "number.min": "Сумма заказа не может быть отрицательной",
    }),
    items: Joi.array()
      .items(Joi.string().hex().length(24).required())
      .min(1)
      .required()
      .messages({
        "array.min": "Должен быть хотя бы один товар",
        "string.length": "Некорректный формат id товара",
        "string.hex": "id товара должно быть в формате hex",
      }),
  }),
});
