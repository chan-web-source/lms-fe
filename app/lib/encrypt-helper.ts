import CryptoJS from 'crypto-js';

const encryptHelper = {
  hash(key: string) {
    return CryptoJS.SHA256(key).toString();
  },
  encrypt(key: string, id: number | string) {
    return encodeURIComponent(CryptoJS.AES.encrypt(id.toString(), key).toString());
  },
  decrypt(key: string, encodedId: string) {
    const decrypted = CryptoJS.AES.decrypt(decodeURIComponent(encodedId), key);
    return decrypted.toString(CryptoJS.enc.Utf8);
  },
};

export { encryptHelper };
