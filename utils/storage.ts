// utils/storage.ts
import { encryptData, decryptData } from "./crypto";

/**
 * Saves the data in local storage after encrypting it.
 * @param {string} key - The key under which the data will be stored.
 * @param {string} data - The data to be encrypted and stored.
 * @returns {Promise<void>}
 */
export const saveToLocalStorage = async (
  key: string,
  input: string
): Promise<void> => {
  try {
    const response = await fetch("/api/crypto", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ action: "encrypt", data: input }),
    });

    if (!response.ok) {
      throw new Error("Failed to encrypt data.");
    }

    const data = await response.json();
    if (typeof window !== "undefined") {
      localStorage.setItem(key, data.result);
    }
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(`Failed to save data: ${error.message}`);
    } else {
      throw new Error("Failed to save data: An unknown error occurred.");
    }
  }
};

/**
 * Retrieves and decrypts the data from local storage.
 * @param {string} key - The key under which the data is stored.
 * @returns {Promise<string | null>} - The decrypted data or null if not found.
 */
export const getFromLocalStorage = async (
  key: string
): Promise<string | null> => {
  try {
    if (typeof window !== "undefined") {
      const encryptedData = localStorage.getItem(key);
      if (!encryptedData) {
        throw new Error("No data found for the provided key.");
      }
      const response = await fetch("/api/crypto", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ action: "decrypt", data: encryptedData }),
      });

      if (!response.ok) {
        throw new Error("Failed to decrypt data.");
      }

      const data = await response.json();
      return data.result;
    } else {
      return null;
    }
  } catch (error) {
    console.error("Decryption error:", error);
    return null;
  }
};
