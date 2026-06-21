/**
 * jsonUtilities.js — CSV / JSON helpers.
 * No DOM, no Knockout — safe to unit-test in Node.
 */

/**
 * Convert an array of objects to a CSV string.
 * Keys of the first object become the header row.
 * @param {object[]} rows
 * @returns {string}
 */
export function toCSV(rows) {
  if (!rows || rows.length === 0) return '';
  const headers = Object.keys(rows[0]);
  const escape  = (v) => `"${String(v ?? '').replace(/"/g, '""')}"`;
  const lines   = [headers.map(escape).join(',')];
  for (const row of rows) {
    lines.push(headers.map((h) => escape(row[h])).join(','));
  }
  return lines.join('\n');
}

/**
 * Safely parse a JSON string; returns fallback on error.
 * @param {string} str
 * @param {*} fallback
 */
export function safeParse(str, fallback = null) {
  try {
    return JSON.parse(str);
  } catch {
    return fallback;
  }
}

/**
 * Deep-clone a plain object/array via JSON round-trip.
 * Do not use on objects with Date, undefined, or functions.
 */
export function deepClone(obj) {
  return JSON.parse(JSON.stringify(obj));
}
