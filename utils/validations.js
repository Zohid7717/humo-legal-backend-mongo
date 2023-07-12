import { body } from 'express-validator';

export const loginValidation = [
  body('email', 'Неверный формат почты!').isEmail(),
  body('password', 'Пароль должен состоять из 5 символов!').isLength({ min: 5 }),
];

export const registerValidation = [
  body('email', 'Неверный формат почты!').isEmail(),
  body('password', 'Пароль должен состоять из 5 символов!').isLength({ min: 5 }),
  body('fullName', 'Введите имя, и оно должно быть не менее 3 символов!').isLength({ min: 3 }),
  body('avatarUrl', 'Неправильная ссылка на аватар!').optional().isURL(),
];

export const postCreateValidation = [
  body('title', 'Введите загаловок!').isLength({ min: 3 }).isString(),
  body('text', 'Введите текст статьи!').isLength({ min: 10 }).isString(),
  body('source', 'Введите источник информации!').isLength({ min: 3 }).isString(),
  body('category', 'Введите категорию информации!').isString(),
  body('imageUrl', 'Неверная ссылка на изображения!').optional().isString(),
];
export const reviewCreateValidation = [
  body('title', 'Введите компанию!').isLength({ min: 3 }).isString(),
  body('text', 'Введите текст отзыва!').isLength({ min: 10 }).isString(),
  body('author', 'Введите автора отзыва!').isString(),
  body('imageUrl', 'Неверная ссылка на изображения!').optional().isString(),
];