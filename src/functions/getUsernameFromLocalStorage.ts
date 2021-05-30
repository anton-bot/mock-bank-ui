import { generateFakeEmail } from './generateFakeEmail';

export function getUsernameFromLocalStorage(): string {
  const existingUsername = localStorage.getItem('username');
  if (existingUsername) {
    return existingUsername;
  }

  const newUsername = generateFakeEmail();
  localStorage.setItem('username', newUsername);
  return newUsername;
}
