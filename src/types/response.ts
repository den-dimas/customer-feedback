export type ApiResponse<T, G> = {
  success: boolean;
  data: T;
  error: G;
};

export function Success<T>(data: T): ApiResponse<T, null> {
  return {
    success: true,
    data,
    error: null,
  };
}

export function Error<G>(error: G): ApiResponse<null, G> {
  return {
    success: false,
    data: null,
    error,
  };
}
