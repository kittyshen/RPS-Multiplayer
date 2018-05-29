/* 
# train schedule
Pseudocode
Step1 
*/

// Initialize Firebase
var config = {
    apiKey: "AIzaSyAIBITEwzXAG1NnjbVLZJtV53ZfuLTdmzw",
    authDomain: "rps-multiplayer-meow.firebaseapp.com",
    databaseURL: "https://rps-multiplayer-meow.firebaseio.com",
    projectId: "rps-multiplayer-meow",
    storageBucket: "rps-multiplayer-meow.appspot.com",
    messagingSenderId: "988274311493"
};
firebase.initializeApp(config);
  
  // Create a variable to reference the database.
  var database = firebase.database();
  
  // --------------------------------------------------------------
  // Link to Firebase Database for viewer tracking

  
var  userListRef = database.ref("/Users");
var tempkey;
var counter= 0;
//var index;
var snapsaved;

function getAvailableKey(obj){
  var arrNum = [];  // define an array to hold all key index already used
  for(prop in obj){
    arrNum.push(parseInt(prop));  // loop and push all used key value into the array
  }
  var keyCanBeUsed = 1;
  while (arrNum.indexOf(keyCanBeUsed) != -1){ // if 
    keyCanBeUsed ++;
  }
  console.log("min available key assign to the fire base: " +keyCanBeUsed);
  return keyCanBeUsed;
}
//getAvailableKey([23,5,1,2,3,4,12,55,6,8]);


// database.ref(".info/connected")
//   .on("value", function (snap) {
//       if (snap.val()) {
        // console.log(snap.val());
        // if we lose network then remove this user from the list
        userListRef.once("value", 
          function(snap) {
          //Display the viewer count in the html.
          //The number of online users is the number of children in the connections list.
          //counter = snap.numChildren();
          counter = getAvailableKey(snap.val());
          console.log("dynamic generated key = "+counter);
          $("#player1").text(JSON.stringify(snap.val()));

        }).then(function(){
          var connection = userListRef.child(counter).set({ 'id': counter, 'name': 'Kitty', 'win':4 });
      
          //postRef.push({ 'name': 'Test Value' })
          //var connection = userListRef.push({ 'id': 1, 'name': 'Kitty', 'win':4 });  //postRef.push({ 'name': 'Test Value' })
          userListRef.child(counter).onDisconnect().remove();
          // console.log(userListRef.child(counter));
          userListRef.on("value", 
          function(snap) {    
            snapsaved = snap.val();
            // console.log(snapsaved);
            $("#connected-viewers").text(JSON.stringify(snapsaved));
            console.log(counter);
            $("#player1").html(snapsaved[counter].name +"<br>"+ snapsaved[counter].id +"<br>"+ snapsaved[counter].win);
          });

        });


    $(document).on("click", "#add-win",function(value){ 
      value.preventDefault();
      console.log("clickeded !");
      // console.log(userListRef);
      userListRef.child(counter).update({win : 6}); 
     // userListRef.update({ 'id': 1, 'name': 'Kitty', 'win':5})
    });


  