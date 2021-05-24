import { Context } from "@nuxt/types";

type RegistrationPayload = {
  email: string;
  username: string;
  password: string;
};

type LoginPayload = {
  email: string;
  password: string;
};

type PasswordResetPayload = {
  code: string;
  password: string;
  passwordConfirmation: string;
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
  login: (payload: LoginPayload) => Promise<any>;
  logout: () => void;
  registerUser: (payload: RegistrationPayload) => Promise<any>;
  requestPasswordReset: (payload: { email: string }) => Promise<any>;
  resetPassword: (payload: PasswordResetPayload) => Promise<any>;
  checkPassword: (
    password: string,
    passwordRepeat?: string
  ) => PasswordCheckResult;
}

export function createAuthActions(context: Context) {
  return {
    login: createLogin(context),
    logout: createLogout(context),
    registerUser: createRegisterUser(context),
    resetPassword: createResetPassword(context),
    requestPasswordReset: createRequestPasswordReset(context),
    checkPassword
  };
}

function createLogin(context: Context) {
  return (payload: LoginPayload, strategy = "local") => {
    return context.$auth.loginWith(strategy, { data: payload });
  };
}

function createLogout(context: Context) {
  return () => {
    return context.$auth.logout();
  };
}

function createRegisterUser(context: Context) {
  return (payload: RegistrationPayload) => {
    return context.$axios.$post("/auth/local/register", payload);
  };
}

function createResetPassword(context: Context) {
  return (payload: PasswordResetPayload) => {
    return context.$axios.post("/auth/reset-password", payload);
  };
}

function createRequestPasswordReset(context: Context) {
  return (payload: { email: string }) => {
    return context.$axios.$post("/auth/forgot-password", payload);
  };
}

function checkPassword(password: string, passwordRepeat?: string) {
  return {
    isValid: true,
    isEqual: password === passwordRepeat,
    tests: []
  };
}
