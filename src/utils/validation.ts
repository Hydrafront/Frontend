/**
 * Checks if a value is empty (null, undefined, empty string, empty array, empty object)
 * @param value - The value to check
 * @returns boolean - True if the value is empty, false otherwise
 */
export const isEmpty = (value: unknown): boolean => {
  if (value === null || value === undefined) {
    return true;
  }

  if (typeof value === 'string') {
    return value.trim().length === 0;
  }

  if (Array.isArray(value)) {
    return value.length === 0;
  }
  if (typeof value === 'number') {
    return value === 0;
  }

  if (typeof value === 'object') {
    return Object.keys(value).length === 0;
  }

  return false;
};

/**
 * Checks if a value is a valid email address
 * @param email - The email address to validate
 * @returns boolean - True if the email is valid, false otherwise
 */
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Checks if a value is a valid phone number (basic validation)
 * @param phone - The phone number to validate
 * @returns boolean - True if the phone number is valid, false otherwise
 */
export const isValidPhone = (phone: string): boolean => {
  const phoneRegex = /^\+?[\d\s-]{10,}$/;
  return phoneRegex.test(phone);
};

/**
 * Checks if a value is a number (including string numbers)
 * @param value - The value to check
 * @returns boolean - True if the value is a number, false otherwise
 */
export const isNumber = (value: unknown): boolean => {
  if (typeof value === 'number') {
    return !isNaN(value);
  }
  return !isNaN(Number(value));
};

/**
 * Checks if a value is within a specified range
 * @param value - The number to check
 * @param min - Minimum value (inclusive)
 * @param max - Maximum value (inclusive)
 * @returns boolean - True if the value is within range, false otherwise
 */
export const isInRange = (value: number, min: number, max: number): boolean => {
  return value >= min && value <= max;
};

/**
 * Checks if a string matches a specific length requirement
 * @param str - The string to check
 * @param minLength - Minimum length required
 * @param maxLength - Maximum length allowed
 * @returns boolean - True if the string length is valid, false otherwise
 */
export const isValidLength = (str: string, minLength: number, maxLength: number): boolean => {
  const length = str.length;
  return length >= minLength && length <= maxLength;
};

/**
 * Checks if a value is a valid URL
 * @param url - The URL to validate
 * @returns boolean - True if the URL is valid, false otherwise
 */
export const isValidUrl = (url: string): boolean => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

/**
 * Checks if a string contains only alphanumeric characters
 * @param str - The string to check
 * @returns boolean - True if the string is alphanumeric, false otherwise
 */
export const isAlphanumeric = (str: string): boolean => {
  return /^[a-zA-Z0-9]+$/.test(str);
};

/**
 * Checks if a value is a valid date
 * @param date - The date to validate
 * @returns boolean - True if the date is valid, false otherwise
 */
export const isValidDate = (date: Date | string): boolean => {
  if (date instanceof Date) {
    return !isNaN(date.getTime());
  }
  return !isNaN(Date.parse(date));
};

/**
 * Checks if a password meets minimum requirements
 * At least 8 characters, 1 uppercase, 1 lowercase, 1 number, 1 special character
 * @param password - The password to validate
 * @returns boolean - True if the password meets requirements, false otherwise
 */
export const isStrongPassword = (password: string): boolean => {
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  return passwordRegex.test(password);
};



