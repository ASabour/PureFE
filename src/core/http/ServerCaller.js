/**
 * ServerCaller.js — thin fetch wrapper used by every API call.
 * Returns Promises, takes plain objects, never touches an observable.
 * Import env.js for the base URL; import tokenService for auth headers.
 */

import { env }          from '@app/config/env.js';
import { tokenService } from '@core/auth/token.js';

/**
 * @param {string} path       — e.g. '/users' or '/users/42'
 * @param {'GET'|'POST'|'PUT'|'DELETE'} method
 * @param {object|null} body  — will be JSON-serialised for POST/PUT
 * @returns {Promise<any>}    — resolves with parsed JSON, rejects with Error
 */
export async function callServer(path, method = 'GET', body = null) {
  const url = `${env.backendServer}${path}`;

  const headers = {
    'Content-Type': 'application/json',
    ...tokenService.authHeader(),
  };

  const options = { method, headers };
  if (body && (method === 'POST' || method === 'PUT' || method === 'PATCH')) {
    options.body = JSON.stringify(body);
  }

  const response = await fetch(url, options);

  if (!response.ok) {
    const message = await response.text().catch(() => response.statusText);
    throw new Error(`[${response.status}] ${message}`);
  }

  // Return null for 204 No Content
  if (response.status === 204) return null;

  return response.json();
}
