import { AuthGuard } from './auth.guard';
import { AuthService } from './auth.service';

describe('AuthGuard', () => {
  let authGuard: AuthGuard;
  let authService: AuthService;

  beforeEach(() => {
    authGuard = new AuthGuard(authService);
  });

  it('should be defined', () => {
    expect(authGuard).toBeDefined();
  });
});
