import { initializeApp } from "firebase/app";

// For Auth
import { getAuth } from "firebase/auth";

// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
  // apiKey: "AIzaSyDDFo4wBsEqncgvUCYMuueXKEW13OxFipI",
  // authDomain: "bcssp21g3.firebaseapp.com",
  // databaseURL: "https://bcssp21g3-default-rtdb.asia-southeast1.firebasedatabase.app",
  // projectId: "bcssp21g3",
  // storageBucket: "bcssp21g3.appspot.com",
  // messagingSenderId: "583558849663",
  // appId: "1:583558849663:web:7d237590de9a76826bcb4a",
  // measurementId: "G-1ZC525BTQ2",

  apiKey: "AIzaSyDSIsMwD1GYhRspvNj8ICkM0bPxahKy2wg",
  authDomain: "pocket-pal-f5035.firebaseapp.com",
  projectId: "pocket-pal-f5035",
  storageBucket: "pocket-pal-f5035.appspot.com",
  messagingSenderId: "946150453444",
  appId: "1:946150453444:web:7fe9a1c45f0e53d45a5991",
};

// Initialize Firebase
// if (!firebase.apps.length) {
//   firebase.initializeApp(config);
// }
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
