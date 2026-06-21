/**
 * token.js — token storage and auth-header helper.
 * Uses sessionStorage so the token is cleared when the tab closes.
 * No Knockout, no DOM — safe to unit-test in Node.
 */

const TOKEN_KEY = 'purefe_auth_token';

export const tokenService = {
  /** Save a JWT received from the server. */
  set(token) {
    sessionStorage.setItem(TOKEN_KEY, token);
  },

  /** Retrieve the stored token, or null if not logged in. */
  get() {
    return sessionStorage.getItem(TOKEN_KEY);
  },

  /** Remove the token (logout). */
  clear() {
    sessionStorage.removeItem(TOKEN_KEY);
  },

  /**
   * Returns a headers object ready to pass to fetch().
   * @returns {{ Authorization?: string }}
   */
  authHeader() {
    const token = tokenService.get();
    return token ? { Authorization: `Bearer ${token}` } : {};
  },
};
