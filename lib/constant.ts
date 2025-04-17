import { v4 as uuid } from 'uuid';

export const BASE_URL = process.env.API_BASE_URL;

export const USER_LOGIN = process.env.USER_LOGIN;

export const PASSWORD_LOGIN = process.env.PASSWORD_LOGIN;

export const randomId = () => uuid();
