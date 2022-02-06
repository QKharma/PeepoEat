export type Option<T> = T | undefined;

export function isSome<T>(option: Option<T>): option is T {
  if (option) return true;
  return false;
}