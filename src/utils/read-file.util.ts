import { readFileSync } from 'fs';

export const readFile = (path: string): string => {
  try {
    const result = readFileSync(path, {
      encoding: 'utf-8',
    });
    return result;
  } catch (err) {
    throw new Error(err);
  }
};
