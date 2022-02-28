
/**
 * Export `handleRequestError`.
 */

export function handleRequestError(error: any) {
  return error?.response ?? error;
}
