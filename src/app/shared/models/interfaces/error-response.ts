export interface ErrorResponse {
  data: {};
  error: {
    status: number;
    name: string;
    message: string;
    details: {};
  };
}
