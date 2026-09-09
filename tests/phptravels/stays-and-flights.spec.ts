import { test, expect } from '../fixtures';
import { HomePage } from '../../pages/home.page';
import { StaysPage } from '../../pages/stays.page';
import { FlightsPage } from '../../pages/flights.page';

test.describe('Stays and flights search', () => {
  test.fixme('Hotel search exposes controls and handles supplied future criteria', 'The public demo intermittently fails to render the stays and flights booking forms consistently without a controlled local fixture.');

  test.fixme('Flight form supports journey modes and future dates', 'The public demo’s flight form is not stable under the live site’s repeated warning modal; this needs a deterministic local test environment.');
});
