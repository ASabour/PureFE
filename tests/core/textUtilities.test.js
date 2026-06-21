import { describe, it, expect } from 'vitest';
import { labelFromKey, truncate, capitalise, toSlug } from '@core/utils/textUtilities.js';

describe('labelFromKey', () => {
  it('converts camelCase to words',  () => expect(labelFromKey('firstName')).toBe('First Name'));
  it('converts snake_case to words', () => expect(labelFromKey('user_email')).toBe('User Email'));
  it('returns empty string for nil', () => expect(labelFromKey('')).toBe(''));
});

describe('truncate', () => {
  it('leaves short strings untouched', () => expect(truncate('Hi', 10)).toBe('Hi'));
  it('truncates long strings',         () => expect(truncate('Hello World', 7)).toBe('Hello…'));
});

describe('capitalise', () => {
  it('capitalises first letter', () => expect(capitalise('hello')).toBe('Hello'));
  it('handles empty string',     () => expect(capitalise('')).toBe(''));
});

describe('toSlug', () => {
  it('converts to slug', () => expect(toSlug('Hello World!')).toBe('hello-world'));
});
