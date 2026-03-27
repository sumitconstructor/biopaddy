// Shared validation patterns and helpers for BioPaddy forms

export const PATTERNS = {
  name: /^[A-Za-z\s]{2,50}$/,
  phone: /^[6-9]\d{9}$/,
  email: /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/,
  password: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/,
  aadhaar: /^\d{12}$/,
  gst: /^\d{2}[A-Z]{5}\d{4}[A-Z]\d[Z][A-Z\d]$/,
  bankAccount: /^\d{9,18}$/,
  ifsc: /^[A-Z]{4}0[A-Z0-9]{6}$/,
  landArea: /^\d+(\.\d{1,2})?$/,
};

export const ERROR_MESSAGES = {
  name: 'Only letters and spaces, 2–50 characters',
  phone: 'Must be 10 digits starting with 6-9',
  email: 'Enter a valid email address',
  password: 'Min 8 chars, 1 uppercase, 1 lowercase, 1 number, 1 special char (@$!%*?&#)',
  aadhaar: 'Must be exactly 12 digits',
  gst: 'Invalid GST format (e.g. 22AAAAA0000A1Z5)',
  bankAccount: 'Must be 9–18 digits',
  ifsc: 'Invalid IFSC (e.g. SBIN0001234)',
  landArea: 'Enter a valid number (e.g. 12 or 5.5)',
};

/**
 * Validate a single field. Returns error string or null.
 */
export function validateField(fieldName, value) {
  if (!value || !value.toString().trim()) return null; // skip empty — let `required` handle it
  const pattern = PATTERNS[fieldName];
  if (!pattern) return null;
  return pattern.test(value.toString().trim()) ? null : ERROR_MESSAGES[fieldName];
}

/**
 * Validate multiple fields at once.
 * @param {Object} fields - { fieldName: value }
 * @returns {Object} - { fieldName: errorMessage | null }
 */
export function validateAll(fields) {
  const errors = {};
  for (const [key, value] of Object.entries(fields)) {
    const err = validateField(key, value);
    if (err) errors[key] = err;
  }
  return errors;
}
