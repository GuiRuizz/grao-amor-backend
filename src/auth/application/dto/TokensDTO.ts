export interface RefreshTokenDTO {
  token: string;
  expiresAt: Date;
}

export interface LoginResponseDTO {
  accessToken: string;
  refreshToken: RefreshTokenDTO;
}

export interface RefreshTokenRequestDTO {
  refreshToken: string;
}

export interface ResetPasswordRequestDTO {
  token: string;
  newPassword: string;
}

export interface ForgotPasswordRequestDTO {
  email: string;
}