import { generateFakeEmail } from './generateFakeEmail';

describe('Generate fake email', () => {
  it('must generate a realistic random email address', () => {
    expect(generateFakeEmail()).toMatch(/^[a-z0-9]{1,30}@block\.one$/);
  });
});
