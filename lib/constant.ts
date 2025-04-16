import { v4 as uuid } from 'uuid';

export const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const randomId = () => uuid();
