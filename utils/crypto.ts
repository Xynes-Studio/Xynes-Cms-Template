// utils/crypto.ts
import CryptoJS from 'crypto-js';

/**
 * Encrypts the given data using AES encryption.
 * @param {string} data - The data to be encrypted.
 * @returns {string} - The encrypted data.
 */
export const encryptData = (data: string): string => {
  const secretKey = process.env.SECRET_KEY;
  if (!secretKey) {
    throw new Error('Secret key not found in environment variables.');
  }

  return CryptoJS.AES.encrypt(data, secretKey).toString();
};

/**
 * Decrypts the given encrypted data using AES decryption.
 * @param {string} encryptedData - The data to be decrypted.
 * @returns {string} - The decrypted data.
 */
export const decryptData = (encryptedData: string): string => {
  const secretKey = process.env.SECRET_KEY;
  if (!secretKey) {
    throw new Error('Secret key not found in environment variables.');
  }

  const bytes = CryptoJS.AES.decrypt(encryptedData, secretKey);
  return bytes.toString(CryptoJS.enc.Utf8);
};
