export interface IAuthResult {
  success: boolean;
  error: IAuthError | null;
}

export interface IAuthError {
  code?: string | undefined;
  message?: string | undefined;
}
