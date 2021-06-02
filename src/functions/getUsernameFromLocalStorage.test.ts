import { getUsernameFromLocalStorage } from './getUsernameFromLocalStorage';

describe('Get username from storage', () => {
  it('must create new username and get it from storage', () => {
    const username1 = getUsernameFromLocalStorage();
    const username2 = getUsernameFromLocalStorage();
    expect(username1).toMatch(/^[a-z0-9]{1,30}@block\.one$/);
    expect(username1).toBe(username2);
  });
});
