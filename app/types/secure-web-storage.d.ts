declare module 'secure-web-storage' {
  interface SecureStorageOptions {
    hash: (key: string) => string;
    encrypt: (data: string) => string;
    decrypt: (data: string) => string;
  }

  class SecureStorage {
    constructor(storage: Storage, options: SecureStorageOptions);

    length: number;

    setItem(key: string, value: string): void;
    getItem(key: string): string | null;
    removeItem(key: string): void;
    clear(): void;
    key(index: number): string | null;
  }

  export default SecureStorage;
}
