/**
 * These routes do not require authentication
 * @type {string[]}
 */
export const publicRoutes = [
    "/",
    "/auth/new-verification",
    "/api/market-data",
]

/**
 * These routes do not require authentication
 * @type {string[]}
 */
export const authRoutes = [
    "/auth/login",
    "/auth/register",
    "/auth/error",
    "/auth/reset",
    "/auth/new-password"
]

/**
 * These routes do not require authentication
 * @type {string}
 */
export const apiAuthPrefix = "/api/auth"

/**
 * These routes do not require authentication
 * @type {string}
 */
export const DEFAULT_LOGIN_REDIRECT = "/"