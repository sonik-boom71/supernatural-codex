/** Бэкенд (БД) считается настроенным, если задан DATABASE_URL. */
export const isDbConfigured = (): boolean => Boolean(process.env.DATABASE_URL);

/** NextAuth готов, если есть секрет и БД. */
export const isAuthConfigured = (): boolean =>
  isDbConfigured() && Boolean(process.env.NEXTAUTH_SECRET);
