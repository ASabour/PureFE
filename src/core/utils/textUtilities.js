/**
 * textUtilities.js — pure string helpers.
 * No DOM, no Knockout, no side effects — safe everywhere.
 */

/**
 * Convert a camelCase or snake_case key to a human-readable label.
 * labelFromKey('firstName')  → 'First Name'
 * labelFromKey('user_email') → 'User Email'
 */
export function labelFromKey(key) {
  if (!key) return '';
  return key
    .replace(/_/g, ' ')                          // snake_case → spaces
    .replace(/([A-Z])/g, ' $1')                  // camelCase  → spaces
    .trim()
    .toLowerCase()
    .replace(/(?:^|\s)\S/g, c => c.toUpperCase()); // capitalise EVERY word
}

/**
 * Truncate a string to maxLength characters, appending suffix if cut.
 * truncate('Hello World', 7) → 'Hello…'
 */
export function truncate(str, maxLength = 100, suffix = '…') {
  if (!str) return '';
  if (str.length <= maxLength) return str;
  return str.slice(0, maxLength - suffix.length).trimEnd() + suffix; // trimEnd removes trailing space
}

/**
 * Capitalise only the first character.
 * capitalise('hello world') → 'Hello world'
 */
export function capitalise(str) {
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1);
}

/**
 * Convert a string to a URL-safe slug.
 * toSlug('Hello World!') → 'hello-world'
 */
export function toSlug(str) {
  if (!str) return '';
  return str
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-');
}
