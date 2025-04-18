import { v4 as uuid } from 'uuid';

export const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const USER_LOGIN = process.env.NEXT_PUBLIC_USER_LOGIN;

export const PASSWORD_LOGIN = process.env.NEXT_PUBLIC_PASSWORD_LOGIN;

export const randomId = () => uuid();
