
export const STORAGE_KEYS = {
  TOKEN: "medibook_token",
  USER: "medibook_user",
};

export function saveAuthData({ token, user }) {
  localStorage.setItem(STORAGE_KEYS.TOKEN, token);
  localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));
}

export function getToken() {
  return localStorage.getItem(STORAGE_KEYS.TOKEN);
}

export function getUser() {
  const user = localStorage.getItem(STORAGE_KEYS.USER)
  return user ? JSON.parse(user) : null;
}

export function clearAuthData() {
  localStorage.removeItem(STORAGE_KEYS.TOKEN);
  localStorage.removeItem(STORAGE_KEYS.USER);
}