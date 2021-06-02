import { Page } from '../types/Page';
import { getUrl } from './navigate';

describe('Navigation between pages', () => {
  it('must replace template inside the page URL', () => {
    expect(getUrl(Page.accountList, { accountId: 'abc123' })).toBe('/app/accounts');
    expect(getUrl(Page.viewAccount, { accountId: 'abc123' })).toBe('/app/accounts/abc123');
  });
});
