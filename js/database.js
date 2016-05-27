// Initialize Firebase
var config = {
  apiKey: "AIzaSyCMPggR7F8NTqpCnDO3vJU0xMKc6fBUb-0",
  authDomain: "simon-f41bd.firebaseapp.com",
  databaseURL: "https://simon-f41bd.firebaseio.com",
  storageBucket: "",
};
firebase.initializeApp(config);

var database = firebase.database();
database.ref('high-score').on('value', function(snapshot) {
  console.log(snapshot.val());
});
database.ref('high-score').set({
	score: 0
});
console.log('123');
database.ref('high-score').set({
	score: 1
});
console.log('xyz');
database.ref('high-score').once('value').then(function(snapshot){
	console.log(snapshot.val());
})