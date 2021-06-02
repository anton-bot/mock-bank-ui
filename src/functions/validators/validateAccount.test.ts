import { validateAccount } from './validateAccount';

describe('Validate Account', () => {
  it('must not accept an empty account number', () => {
    expect(validateAccount('')?.length).toBeGreaterThan(2);
    expect(validateAccount(undefined as unknown as string)?.length).toBeGreaterThan(2);
    expect(validateAccount(null as unknown as string)?.length).toBeGreaterThan(2);
  });

  it('must accept a valid account number', () => {
    expect(validateAccount('abc123')).toBeUndefined();
    expect(validateAccount('305196f9-8d08-4a77-b422-09b042aece7a')).toBeUndefined();
  });
});
