export enum TokenType {
  ACCESS = 'ACCESS',
  REFRESH = 'REFRESH',
}

export const HASH_ROUNDS = 10;

export const JWT_SECRET = process.env.JWT_SECRET;

export const JWT_EXPIRES_IN = (tokenType: TokenType) => {
  if (tokenType == TokenType.ACCESS) return process.env.JWT_ACCESS_EXPIRES_IN;
  else return process.env.JWT_REFRESH_EXPIRES_IN;
};
