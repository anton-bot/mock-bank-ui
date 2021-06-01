import moment from 'moment';

export function formatDate(datetime: string): string {
  return moment.utc(datetime).local().format('D MMM YYYY HH:mm');
}
