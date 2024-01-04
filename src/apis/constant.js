const LIVE_URL = "http://192.168.100.33:3030/api/v1/";
// const LIVE_URL = "https://52.66.63.79/api/v1";
// const LOCAL_URL = "http://192.168.100.33:3030/api/v1/";
const LOCAL_URL = "http://192.168.100.33:3030/api/v1";
// const LIVE_URL = "https://192.168.100.33:3030/api/v1";

// const BASE_URL = LIVE_URL;
const BASE_URL = LOCAL_URL;
const TOKEN = localStorage.getItem("token");

export { LIVE_URL, LOCAL_URL, TOKEN, BASE_URL };

// import CryptoJS from 'crypto-js';

// // Constants for URLs
// const LIVE_URL = "https://koko-ranch.herokuapp.com";
// const LOCAL_URL = "http://192.168.0.42:3030/api/v1";

// // Base URL (you can switch between live and local as needed)
// const BASE_URL = LOCAL_URL; // Set this to the desired base URL

// // Retrieve the encrypted token from localStorage
// const storageToken = localStorage.getItem("token");

// // Create an encryption key (you can use the same key for decryption)
// const encryptionKey = CryptoJS.lib.WordArray.random(32);

// // Encrypt the token
// const encryptedToken = CryptoJS.AES.encrypt(storageToken, encryptionKey).toString();

// // Decrypt the token when needed (e.g., when sending it in headers)
// const decryptedToken = CryptoJS.AES.decrypt(encryptedToken, encryptionKey).toString(CryptoJS.enc.Utf8);

// // Use the decrypted token in your application, for example, when making API requests
// const TOKEN = decryptedToken; // Use the decrypted token in your headers

// export { LIVE_URL, LOCAL_URL, TOKEN, BASE_URL };
