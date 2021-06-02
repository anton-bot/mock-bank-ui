import { validateAmount } from './validateAmount';

describe('Validate a dollar amount', () => {
  it('must not run the check when an account balance is not provided', () => {
    expect(validateAmount('999999999', undefined)).toBeUndefined();
  });

  it('must not allow transfers bigger than the remaining balance on the account', () => {
    expect(validateAmount('999.99', 99998)?.length).toBeGreaterThan(2);
    expect(validateAmount('999.99', 99999)).toBeUndefined();
    expect(validateAmount('999.99', 100000)).toBeUndefined();
  });

  it('must not allow a non-valid number', () => {
    expect(validateAmount('abc', 999)?.length).toBeGreaterThan(2);
    expect(validateAmount('123,456', 999)?.length).toBeGreaterThan(2);
    expect(validateAmount('123abc', 124)?.length).toBeGreaterThan(2);
  });
});
