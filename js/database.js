// Initialize Firebase
var config,
    database;

config = {
  apiKey: "AIzaSyCMPggR7F8NTqpCnDO3vJU0xMKc6fBUb-0",
  authDomain: "simon-f41bd.firebaseapp.com",
  databaseURL: "https://simon-f41bd.firebaseio.com",
  storageBucket: "",
};

firebase.initializeApp(config);

database = firebase.database();