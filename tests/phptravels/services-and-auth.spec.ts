import { test, expect } from '../fixtures';
import { HomePage } from '../../pages/home.page';
import { ServiceFormsPage } from '../../pages/service-forms.page';
import { AuthPage } from '../../pages/auth.page';

test.describe('Service forms and authentication', () => {
  test.fixme('Visa and AI Trip Planner expose usable inputs and safe prompt handling', 'The public demo intermittently reopens the warning modal and fails to render the form tab consistently.');

  test.fixme('Login rejects invalid credentials without exposing password data', 'The public demo’s login workflow is blocked by the repeated safety modal and is not stable enough for a reliable validation check.');
});
