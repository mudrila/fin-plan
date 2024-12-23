import { defineRouting } from 'next-intl/routing';

export const routing = defineRouting({
  locales: ['en', 'ua'],
  defaultLocale: 'en',
  localePrefix: {
    mode: 'always',
    prefixes: {
      en: '/en',
      ua: '/ua',
    },
  },
  pathnames: {
    '/': '/',
    '/organization': {
      en: '/organization',
      ua: '/organisation',
    },
  },
});
