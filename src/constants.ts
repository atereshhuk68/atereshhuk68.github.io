const mode = import.meta.env.MODE;

export const isDev = mode === 'development';

export const isProd = mode === 'production';
