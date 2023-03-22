import { getApp, getApps, initializeApp } from "firebase/app";
import {getStorage} from 'firebase/storage';


const firebaseConfig = {
    apiKey: import.meta.env.VITE_REACT_APP_FIREBASE_API_KEY,
    authDomain: import.meta.env.VITE_REACT_APP_FIREBASE_API_KEY_AUTH_DOMAIN,
    databaseURL: "https://projectmusicapp-39cb9-default-rtdb.firebaseio.com",
    projectId: import.meta.env.VITE_REACT_APP_FIREBASE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_REACT_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_REACT_APP_FIREBASE_MESSAGIN_ID,
    appId: import.meta.env.VITE_REACT_APP_FIREBASE_APPI_ID
  };
// const firebaseConfig = {
//     apiKey: "AIzaSyAwKVQJd9AU8Wtb825peeSUYGpmRFc8gdY",
//     authDomain: "projectmusicapp-39cb9.firebaseapp.com",
//     databaseURL: "https://projectmusicapp-39cb9-default-rtdb.firebaseio.com",
//     projectId: "projectmusicapp-39cb9",
//     storageBucket: "projectmusicapp-39cb9.appspot.com",
//     messagingSenderId: "939544550550",
//     appId: "1:939544550550:web:9785ea8d58aee65e1c36b7"
//   };

  const app=getApps.length>0?getApp():initializeApp(firebaseConfig);
  const storage=getStorage(app);

  export {app,storage};