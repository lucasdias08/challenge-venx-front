import firebase from "firebase";
import "firebase/database";

var firebaseConfig = {
  apiKey: "AIzaSyBp9wi38V1eCuD_SmZpORP0mwLXiKVh4eY",
  authDomain: "automacao-guest-posts.firebaseapp.com",
  projectId: "automacao-guest-posts",
  storageBucket: "automacao-guest-posts.appspot.com",
  messagingSenderId: "148244610062",
  appId: "1:148244610062:web:90e8a3470905195aa9d05f"
};
  // Initialize Firebase
if(!firebase.apps.length){
    firebase.initializeApp(firebaseConfig);
}

export default firebase;