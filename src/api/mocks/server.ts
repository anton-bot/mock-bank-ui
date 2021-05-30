import { createServer, Request } from 'miragejs';
import { getAccounts, transfer } from './fakebank';

export function createMockBackend() {
  createServer({
    routes() {
      this.get('/account', (schema, request) => {
        return getAccounts(getUsername(request));
      });
      this.post('/transfer', (schema, request) => {
        const body = JSON.parse(request.requestBody);
        transfer(getUsername(request), body.from, body.to, body.amount);
        return {};
      });
    },
  });
}

// In a real environment, the user would be retrieved from e.g. JWT token
function getUsername(request: Request) {
  return request.requestHeaders.token;
}
