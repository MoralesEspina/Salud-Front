import { Injectable } from '@angular/core';
import CryptoJS from 'crypto-js';
import SecureStorage from 'secure-web-storage';
import { environment } from 'src/environments/environment.prod';
const SECRET_KEY = environment.SECRET_KEY
@Injectable({
    providedIn: 'root'
})
export class StorageService {
    constructor() { }
    public secureStorage = new SecureStorage(sessionStorage, {
        hash: function hash(key): any {
            key = CryptoJS.SHA256(key, SECRET_KEY);
            return key.toString();
        },
        // Encrypt the localstorage data
        encrypt: function encrypt(data) {
            data = CryptoJS.AES.encrypt(data, SECRET_KEY);
            data = data.toString();
            return data;
        },
        // Decrypt the encrypted data
        decrypt: function decrypt(data) {
            data = CryptoJS.AES.decrypt(data, SECRET_KEY);
            data = data.toString(CryptoJS.enc.Utf8);
            return data;
        }
    });
}