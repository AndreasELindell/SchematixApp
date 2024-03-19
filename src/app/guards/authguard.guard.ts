import { CanActivateFn } from '@angular/router';

import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const service = inject(AuthService);
  return service.isLoggedIn();
};
