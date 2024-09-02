export const ResponseCodeMap = {
  SUCCESS: 0,
  REQUESTED_PARAMETER_INVALID: 1,
  REQUESTED_HANDLE_EXCEPTION: 2,
  REQUESTED_RESOURCE_NOT_FOUND: 3,
  AUTHENTICATION_FAILED: 4,

  APP_AUTH_NO_APP_ID: 105001,
  APP_AUTH_ERROR_APP_ID: 105002,
  APP_AUTH_NO_PERMISSION: 105003,
}

export enum ErrorCodeEnum {
  ParameterParsingError = '2000',
}

export const ErrorCode: Record<string, string> = {
  '1000': 'Login failed',
  '1001': 'User existed',
  '1002': 'User not existed',
  '1003': 'Send email failed',
  '1004': 'Verify failed',
  '1005': 'Password error',
  '1006': 'User bound',
  '1008': 'Company code error',
  '1009': 'Company code bound',
  '1011': 'Init user error',
  '1012': 'Package not existed',
  '1013': 'Email format error',
  '1019': 'Email already exit',
  // used for frontend
  [ErrorCodeEnum.ParameterParsingError]: 'Parameter parsing error',
}

export const URL_GITHUB_RELEASE = 'https://github.com/arextest/releases/releases'
