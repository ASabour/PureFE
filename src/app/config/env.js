/**
 * env.js — single source of truth for environment constants.
 * Never hard-code URLs or flags anywhere else in the codebase.
 */

const env = {
  /** Base URL of the backend API. In dev, Vite proxy rewrites /api → real server. */
  backendServer: import.meta.env.VITE_BACKEND_SERVER ?? '/api',

  /** Human-readable name shown in the browser tab and site header. */
  appName: import.meta.env.VITE_APP_NAME ?? 'PureFE',

  /** Feature flags — flip to false to hide incomplete features in production. */
  features: {
    darkMode:      true,
    notifications: true,
  },

  /** true when running under `vite dev` */
  isDev: import.meta.env.DEV,
};

export { env };
export default env;
