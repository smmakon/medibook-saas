export function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export function isStrongEnoughPassword(password) {
  return password && password.length >= 8;
}

export function isSameValue(value1, value2) {
  return value1 === value2;
}