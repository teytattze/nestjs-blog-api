export const objectMapping = <T = any>(
  keys: string,
  object: Record<string, any>,
): T | Record<string, any> => {
  const arr = keys.split('.');
  let result = object;
  for (const key of arr) {
    result = result[key];
  }
  return result;
};
