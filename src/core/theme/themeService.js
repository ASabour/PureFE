/**
 * themeService.js — Light / dark theme.
 *
 *   Exposes ONE observable (`mode`) and ONE method (`toggle`).
 *   Persists the user's choice in localStorage under "purefe.theme".
 *   Applies the choice by setting  document.documentElement.dataset.theme.
 *
 *   CSS reads it via the [data-theme="dark"] selector — see ui/styles/tokens.css.
 *   That is the entire mechanism. No CSS-in-JS, no extra build step.
 *
 *   Usage:
 *     import theme from 'src/core/theme/themeService.js';
 *     theme.mode()       // 'light' | 'dark'
 *     theme.toggle()     // flips and persists
 *     theme.set('dark')  // sets explicitly
 */

import ko from 'knockout';

const STORAGE_KEY = 'purefe.theme';

function getInitial() {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved === 'light' || saved === 'dark') return saved;
  // Honor the OS preference on first visit.
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

const mode = ko.observable(getInitial());

function apply(value) {
  document.documentElement.dataset.theme = value;
}

// Apply immediately (covers the first paint) and on every change.
apply(mode());
mode.subscribe((v) => {
  apply(v);
  localStorage.setItem(STORAGE_KEY, v);
});

const themeService = {
  mode,
  set(value) {
    if (value === 'light' || value === 'dark') mode(value);
  },
  toggle() {
    mode(mode() === 'dark' ? 'light' : 'dark');
  },
};

export default themeService;