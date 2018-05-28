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
  
  
  // --------------------------------------------------------------
  // Initial Values
  var initialBid = 0;
  var initialBidder = "No one :-(";
  var highPrice = initialBid;
  var highBidder = initialBidder;
  
  // --------------------------------------------------------------
  
  // Add ourselves to presence list when online.
  // var connectionsRef = database.ref("/USERS_ONLINE");
  
  // // '.info/connected' is a special location provided by Firebase that is updated every time
  // // the client's connection state changes.
  // // '.info/connected' is a boolean value, true if the client is connected and false if they are not.
  // var connectedRef = database.ref(".info/connected");
  
  // // When the client's connection state changes...
  // connectedRef.on("value", function(snap) {
  
  //   // If they are connected..
  //   if (snap.val()) {
  
  //     // Add user to the connections list.
  //     var con = connectionsRef.push({ 'name': 'Test Value' });  //postRef.push({ 'name': 'Test Value' })
  
  //     // Remove user from the connection list when they disconnect.
  //     con.onDisconnect().remove();
  //   }
  // });
  
var  userListRef = database.ref("/Users");
var tempkey;
var counter= 0;
// Monitor connection state on browser tab
userListRef.on("value", function(snap) {

  // Display the viewer count in the html.
  // The number of online users is the number of children in the connections list.
  counter = snap.numChildren();
  // console.log(counter);
});
var index;
var snapsaved;
// database.ref(".info/connected")
//   .on("value", function (snap) {
//       if (snap.val()) {
        // console.log(snap.val());
        // if we lose network then remove this user from the list
        userListRef.once("value", 
          function(snap) {
          //Display the viewer count in the html.
          //The number of online users is the number of children in the connections list.
          counter = snap.numChildren();
          console.log(counter);
          $("#player1").text(JSON.stringify(snap.val()))//+ "\n"+JSON.stringify(snap.val().child(index).win));

        }).then(function(){
          var connection = userListRef.child(counter+1).set({ 'id': counter+1, 'name': 'Kitty', 'win':4 });
      
          //postRef.push({ 'name': 'Test Value' })
          //var connection = userListRef.push({ 'id': 1, 'name': 'Kitty', 'win':4 });  //postRef.push({ 'name': 'Test Value' })
          index = userListRef.child(counter).key;
          userListRef.child(index).onDisconnect().remove();
          console.log(userListRef.child(index));
          userListRef.on("value", 
          function(snap) {    
            snapsaved = snap.val();
            console.log(snapsaved);
            $("#connected-viewers").text(JSON.stringify(snapsaved));
            console.log(index);
            $("#player1").text(snapsaved[index].name +":"+ snapsaved[index].id +":"+ snapsaved[index].win);
          });

        });


    $(document).on("click", "#add-win",function(value){ 
      value.preventDefault();
      console.log("clickeded !");
      // console.log(userListRef);
      userListRef.child(index).update({win : 6}); 
     // userListRef.update({ 'id': 1, 'name': 'Kitty', 'win':5})
    });


  