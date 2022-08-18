/**
 * Debug flag, returns true if development env set, false else. Used to encapsulate debug operations.
 * @returns boolean
 */
export const DEBUG = process.env.NODE_ENV === 'development';