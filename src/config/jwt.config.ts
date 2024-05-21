export enum TokenType {
  ACCESS = 'ACCESS',
  REFRESH = 'REFRESH',
}

export const HASH_ROUNDS = 10;

export const JWT_SECRET = 'jwt-secret-dead-lock';

export const JWT_EXPIRES_IN = (tokenType: TokenType) => {
  if (tokenType == TokenType.ACCESS) return 300;
  else return 3600;
};
