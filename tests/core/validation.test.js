import { describe, it, expect } from 'vitest';
import { validators, validate } from '@core/validation/validation.js';

describe('validators.required', () => {
  it('fails on empty string',    () => expect(validators.required('')).toBeTruthy());
  it('fails on null',            () => expect(validators.required(null)).toBeTruthy());
  it('passes on non-empty',      () => expect(validators.required('hello')).toBeNull());
});

describe('validators.email', () => {
  it('passes valid email',       () => expect(validators.email('a@b.com')).toBeNull());
  it('fails invalid email',      () => expect(validators.email('notanemail')).toBeTruthy());
  it('skips empty (use required for that)', () => expect(validators.email('')).toBeNull());
});

describe('validators.minLength', () => {
  it('passes when long enough',  () => expect(validators.minLength(3)('abc')).toBeNull());
  it('fails when too short',     () => expect(validators.minLength(5)('abc')).toBeTruthy());
});

describe('validators.maxLength', () => {
  it('passes within limit',      () => expect(validators.maxLength(10)('hello')).toBeNull());
  it('fails when too long',      () => expect(validators.maxLength(3)('hello')).toBeTruthy());
});

describe('validate (compose)', () => {
  it('returns first error found', () => {
    const err = validate('', [validators.required, validators.email]);
    expect(err).toBeTruthy();
  });
  it('returns null when all pass', () => {
    const err = validate('a@b.com', [validators.required, validators.email]);
    expect(err).toBeNull();
  });
});
