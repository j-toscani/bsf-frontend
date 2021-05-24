type RegistrationPayload = {
  email: string;
  username: string;
  password: string;
};

type PasswordTest = {
  predicate: RegExp | string;
  passed: boolean;
  test: string;
};

type PasswordCheckResult = {
  isValid: boolean;
  isEqual: boolean;
  tests: PasswordTest[];
};

export interface AuthActions {
  registerUser: (payload: RegistrationPayload) => void;
  resetPassword: (payload: { email: string }) => void;
  checkPassword: (
    password: string,
    passwordRepeat?: string
  ) => PasswordCheckResult;
}

export function createAuthActions() {
  return {
    registerUser,
    resetPassword,
    checkPassword
  };
}

function registerUser(payload: RegistrationPayload) {}

function resetPassword(payload: { email: string }) {}

function checkPassword(password: string, passwordRepeat?: string) {}
