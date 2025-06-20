const mode = import.meta.env.MODE;

export const isDev = mode === 'development';

export const SITE = !isDev ? 'https://bfancy.pl' : 'http://localhost:4321';

export const BOOKY_LINK = 'https://booksy.com/pl-pl/dl/show-business/296324' as const;
