/**
 * notification.js — toast component view-model.
 * Template is imported as a raw string (?raw) — no AMD loader needed.
 */
import ko from 'knockout';
import template from './notification.html?raw';

class NotificationViewModel {
  constructor() {
    this.toasts = ko.observableArray([]);
    
    // Explicitly bind the function instance context
    this._handleNotification = (e) => this._add(e.detail);
    window.addEventListener('purefe:notify', this._handleNotification);
  }

  _add({ message, type = 'info', duration = 3500 }) {
    const toast = {
      id:      Date.now(),
      message: ko.observable(message),
      type:    ko.observable(type),
    };
    this.toasts.push(toast);
    if (duration > 0) {
      setTimeout(() => this.dismiss(toast), duration);
    }
  }

  dismiss(toast) {
    this.toasts.remove(toast);
  }

  iconFor(type) {
    return { success: '✓', error: '✕', warning: '⚠', info: 'ℹ' }[type] ?? 'ℹ';
  }
}

ko.components.register('notification-toast', {
  viewModel: NotificationViewModel,
  template,                          // ← raw string, NOT { require: '...' }
});
