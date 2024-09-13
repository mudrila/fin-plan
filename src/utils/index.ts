import * as crypto from 'crypto';

const PASSWORD_LENGTH = 256;
export const ITERATIONS = 10000;
const DIGEST = 'sha256';
const BYTE_TO_STRING_ENCODING = 'hex'; // this could be base64, for instance

/**
 * The information about the password that is stored in the database
 */
interface PersistedPassword {
  salt: string;
  hash: string;
  iterations: number;
}

/**
 * Generates a PersistedPassword given the password provided by the user.
 * This should be called when creating a user or redefining the password
 */
export function generateHashPassword(password: string): Promise<PersistedPassword> {
  return new Promise<PersistedPassword>((accept, reject) => {
    const salt = process.env.PASSWORD_SALT!;
    crypto.pbkdf2(password, salt, ITERATIONS, PASSWORD_LENGTH, DIGEST, (error, hash) => {
      if (error) {
        return reject(error);
      }

      accept({
        salt,
        hash: hash.toString(BYTE_TO_STRING_ENCODING),
        iterations: ITERATIONS,
      });
    });
  });
}
