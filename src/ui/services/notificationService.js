/**
 * notificationService.js — singleton toast service.
 * Dispatches a custom DOM event that the <notification-toast> component listens to.
 * Import the default `notify` object for convenience, or use named exports directly.
 *
 * Usage in any view-model:
 *   import notify from '../../../ui/services/notificationService.js';
 *   notify.success('Saved!');
 *   notify.error('Something went wrong.');
 */

const EVENT_NAME = 'purefe:notify';

function _dispatch(message, type, duration) {
  window.dispatchEvent(
    new CustomEvent(EVENT_NAME, { detail: { message, type, duration } }),
  );
}

// ── Named exports (used by power users who want fine control) ─────────────────
export const notify        = (message, type = 'info', duration = 3500) => _dispatch(message, type, duration);
export const notifySuccess = (msg, duration = 3500) => _dispatch(msg, 'success', duration);
export const notifyError   = (msg, duration = 5000) => _dispatch(msg, 'error',   duration);
export const notifyWarning = (msg, duration = 3500) => _dispatch(msg, 'warning', duration);
export const notifyInfo    = (msg, duration = 3500) => _dispatch(msg, 'info',    duration);

// ── Default export — object with shorthand methods ────────────────────────────
// home.js (and any feature) does:  import notify from '.../notificationService.js'
// then calls:  notify.success(msg)  /  notify.error(msg)  etc.
const notifyDefault = {
  show:    notify,
  success: notifySuccess,
  error:   notifyError,
  warning: notifyWarning,
  info:    notifyInfo,
};

export default notifyDefault;
