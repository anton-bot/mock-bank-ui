# Mock UI for a bank

## Running

1. Install packages from lockfile: `npm ci`
2. Run: `npm start`

## Backend

This project uses a mock API implementation, so no backend is needed.

## Pipeline

To be implemented.

## Considerations

- Used Mirage to mock the backend. This will allow us to quickly switch to a real backend, once it's implemented, without any code changes.

- Used integer numbers and currency.js for storing dollar amounts to avoid floating point issues (the `0.1 + 0.2` problem, the `(1.005).toFixed(2)` problem)

## Technical debt

- Handle API errors
- Add loading indicator
- Add animation for hamburger menu on mobile
