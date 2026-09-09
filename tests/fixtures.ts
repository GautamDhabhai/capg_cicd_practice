import { test as base } from '@playwright/test';

const data = require('../test-data/phptravels-test-data.json') as {
  environment: { baseUrl: string; supportedCurrencies: string[]; supportedLanguages: string[] };
  hotelSearch: { valid: { destination: string; checkIn: string; checkOut: string } };
  flightSearch: { valid: { departureDate: string; returnDate: string } };
  auth: { invalidCustomer: { malformedEmail: string; password: string } };
  aiPlanner: { invalid: { scriptPayload: string } };
};

export const test = base.extend<{ data: typeof data }>({
  data: async ({}, use) => use(data),
});

export { expect } from '@playwright/test';
