import * as bcrypt from 'bcryptjs';

const SALT_ROUNDS = 10;

export const hashString = async (value: string): Promise<string> => {
  const hashedValue = await bcrypt.hash(value, SALT_ROUNDS);
  return hashedValue;
};

export const compareHashedString = async (
  value: string,
  hashedString: string,
): Promise<boolean> => {
  const isMatched = await bcrypt.compare(value, hashedString);
  return isMatched;
};
