export type Result<T> = T | Error;

export function isError<T>(result: Result<T>): result is Error {
  return result instanceof Error;
}

export function isSuccess<T>(result: Result<T>): result is T {
  return !isError(result);
}