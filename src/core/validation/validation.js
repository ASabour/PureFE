/**
 * validation.js — composable field validators.
 * Each validator returns null (valid) or an error string (invalid).
 * No DOM, no Knockout — test freely in Node.
 */

export const validators = {
  /** Field must not be empty / null / undefined. */
  required(value) {
    if (value === null || value === undefined) return 'This field is required.';
    if (typeof value === 'string' && value.trim() === '') return 'This field is required.';
    return null;
  },

  /** Must be a valid email address. */
  email(value) {
    if (!value) return null; // let `required` handle empty
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(value) ? null : 'Enter a valid email address.';
  },

  /**
   * Minimum character length.
   * @param {number} min
   */
  minLength(min) {
    return (value) => {
      if (!value) return null;
      return value.length >= min ? null : `Must be at least ${min} characters.`;
    };
  },

  /**
   * Maximum character length.
   * @param {number} max
   */
  maxLength(max) {
    return (value) => {
      if (!value) return null;
      return value.length <= max ? null : `Must be no more than ${max} characters.`;
    };
  },

  /** Must be a positive integer (as string or number). */
  positiveInt(value) {
    if (!value && value !== 0) return null;
    const n = Number(value);
    return Number.isInteger(n) && n > 0 ? null : 'Must be a positive whole number.';
  },
};

/**
 * Run a list of validators against a value and return the first error, or null.
 * @param {*} value
 * @param {Function[]} fns
 * @returns {string|null}
 */
export function validate(value, fns) {
  for (const fn of fns) {
    const error = fn(value);
    if (error) return error;
  }
  return null;
}
