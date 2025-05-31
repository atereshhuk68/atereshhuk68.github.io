const mode = import.meta.env.MODE;

export const SITE = 'https://bfancy.pl';

export const COOKIE_NAME = 'bfancy-cookie-policy';

export const isDev = mode === 'development';

export const isProd = mode === 'production';

// Animation constants
export const CUBIC_BEZIER_BOUNCE = 'cubic-bezier(.47,1.64,.41,.8)';
