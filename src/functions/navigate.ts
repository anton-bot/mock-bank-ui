import { History } from 'history';
import { Page } from '../types/Page';

export function navigate(history: History, page: Page, urlParams?: Record<string, string>): void {
  window.scrollTo(0, 0);
  history.push(getUrl(page, urlParams));
}

export function getUrl(page: Page, urlParams?: Record<string, string>): string {
  let url: string = page;
  if (urlParams) {
    for (const [key, value] of Object.entries(urlParams)) {
      url = url.replace(`:${key}`, value);
    }
  }
  return url;
}
