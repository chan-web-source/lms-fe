export type SignInDto = {
  email: string;
  password: string;
};

export type SendOtp = {
  method: 'email' | 'phone';
};

export type VerifyOtp = {
  email: string;
  otp: string;
};
