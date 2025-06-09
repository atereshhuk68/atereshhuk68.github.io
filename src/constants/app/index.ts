const mode = import.meta.env.MODE;

export const isDev = mode === 'development';

export const SITE = !isDev ? 'https://bfancy.pl' : 'http://localhost:4321';
