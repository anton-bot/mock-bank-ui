import { formatDate } from './formatDate';

describe('Format date', () => {
  it('must formate date in the long format', () => {
    expect(formatDate('2021-02-28T14:02:59.001Z')).toMatch(/^28 Feb 2021 \d{2}:\d{2}$/);
  });
});
