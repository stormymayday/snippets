/**
 * An array of routes that are accessible to the public.
 * These routes do not require authentication.
 * @type {string[]}
 */
export const publicRoutes = ["/"];

/**
 * An array of routes that are used for authentication.
 * These routes will redirect logged in users.
 * @type {string[]}
 */
export const authRoutes = ["/auth/login", "/auth/register"];

/**
 * Prefix for API authentication routes.
 * Routes that start with this prefix are used for API authentication.
 * @type {string}
 */
export const apiAuthPrefix = "/api/auth";

/**
 * Default redirect path after logging in.
 * @type {string}
 */
export const DEFAULT_LOGIN_REDIRECT = "/snippets";
