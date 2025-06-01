const mode = import.meta.env.MODE;

export const isDev = mode === 'development';

export const isProd = mode === 'production';

export const SITE = !isDev ? 'https://bfancy.pl' : 'http://localhost:4321';

export const COOKIE_NAME = 'bfancy-cookie-policy';

export const SPECIAL_OFFER_COOKIE_NAME = 'specialOffer' as const;

// Animation constants
export const CUBIC_BEZIER_BOUNCE = 'cubic-bezier(.47,1.64,.41,.8)';
