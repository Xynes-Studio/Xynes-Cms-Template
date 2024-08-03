// utils/storage.ts
import { encryptData, decryptData } from './crypto';

/**
 * Saves the data in local storage after encrypting it.
 * @param {string} key - The key under which the data will be stored.
 * @param {string} data - The data to be encrypted and stored.
 */
export const saveToLocalStorage = (key: string, data: string): void => {
  const encryptedData = encryptData(data);
  typeof window !== "undefined" && localStorage.setItem(key, encryptedData);
};

/**
 * Retrieves and decrypts the data from local storage.
 * @param {string} key - The key under which the data is stored.
 * @returns {string | null} - The decrypted data or null if not found.
 */
export const getFromLocalStorage = (key: string): string | null => {
  const encryptedData = typeof window !== "undefined" ? localStorage.getItem(key) : '';
  if (encryptedData) {
    return decryptData(encryptedData);
  }
  return null;
};
