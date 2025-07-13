interface ErrorResponse {
  response?: {
    data?: {
      message?: string;
      code?: number;
    };
    status?: number;
  };
}

export type { ErrorResponse };
