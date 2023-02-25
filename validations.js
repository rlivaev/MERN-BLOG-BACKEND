import {body}from 'express-validator';

export const loginValidation = [
    body('email','Не верный формат почты').isEmail(),
    body('password','Пароль должен состоять минимум из 5 символов').isLength({min:5}),
];

export const registerValidation = [
    body('email','Не верный формат почты').isEmail(),
    body('password','Пароль должен состоять минимум из 5 символов').isLength({min:5}),
    body('fullName','Укажите польностью имя').isLength({min:3}),
    body('avatarUrl','Не верная ссылка').optional().isURL(),
];

export const postCreateValidation = [
    body('title','Введите заголовок статьи').isLength({min:3}).isString(),
    body('text','Введите текст статьи').isLength({min:3}).isString(),
    body('tags','Неверный формат тэгов (укажите массив)').optional().isString(),
    body('imageUrl','Неверная ссылка на изображение').optional().isString(),
];