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

database.ref(".info/connected")
  .on("value", function (snap) {
      if (snap.val()) {
        // console.log(snap.val());
        // if we lose network then remove this user from the list
        userListRef.once("value", 
          function(snap) {
          //Display the viewer count in the html.
          //The number of online users is the number of children in the connections list.
          counter = snap.numChildren();
          console.log(counter);
        }).then(function(){
          var connection = userListRef.child(counter+1).set({ 'id': counter+1, 'name': 'Kitty', 'win':4 });
      
          //postRef.push({ 'name': 'Test Value' })
          //var connection = userListRef.push({ 'id': 1, 'name': 'Kitty', 'win':4 });  //postRef.push({ 'name': 'Test Value' })
          var index = userListRef.child(counter).key;
          // console.log(userListRef.child(counter));
          userListRef.on("childAdded", 
          function(snap) { userListRef.child(index).onDisconnect().remove();
          
          })
    
          // console.log(connection);
          tempkey = connection.key;
          // $("#connected-viewers").text(JSON.stringify(con));
        });
      }
  });
  userListRef.on("value", function(snap) {
  
    console.log(JSON.stringify(snap.val(),null,1));
    //var tempObj = //JSON.parse(JSON.stringify(snap,null,1));
    // Display the viewer count in the html.
    // The number of online users is the number of children in the connections list.
    //$("#connected-viewers").text(JSON.stringify(snap.val(),null,1));
    $("#connected-viewers").text(JSON.stringify(snap.val(),null,1));
    // for(prop in tempObj){
    //   // console.log(tempObj.prop);
    //   // if(snap.prop.id == "1")
    //   //   $("#player1").text(snap.prop.name);
    // }
    // console.log(tempObj[tempkey]);
    $("#player1").text(JSON.stringify(snap.val().child("1").name)+ "\n"+JSON.stringify(snap.val().child("1").win));
    $(document).on("click", "#add-win",function(value){ 
      value.preventDefault();
      console.log("clickeded !");
      // console.log(userListRef);
      userListRef.child("1").set({win : 6}); 
     // userListRef.update({ 'id': 1, 'name': 'Kitty', 'win':5})
    });

  });

  
  // When first loaded or when the connections list changes...
  // userListRef.on("value", function(snap) {
  
  //   // Display the viewer count in the html.
  //   // The number of online users is the number of children in the connections list.
  //   $("#connected-viewers").text(snap.numChildren());
  // });
  
  // Number of online users is the number of objects in the presence list.
  
  
  // ----------------------------------------------------------------
  // At the page load and subsequent value changes, get a snapshot of the local data.
  // This function allows you to update your page in real-time when the values within the firebase node bidderData changes
  database.ref("/bidderData").on("value", function(snapshot) {
  
    // If Firebase has a highPrice and highBidder stored (first case)
    if (snapshot.child("highBidderSub").exists() && snapshot.child("highPriceSub").exists()) {
  
      // Set the local variables for highBidder equal to the stored values in firebase.
      highBidder = snapshot.val().highBidderSub;
      highPrice = parseInt(snapshot.val().highPriceSub);
  
      // change the HTML to reflect the newly updated local values (most recent information from firebase)
      $("#highest-bidder").text(highBidder);
      $("#highest-price").text("$" + highPrice);
  
      // Print the local data to the console.
      console.log(snapshot.val().highBidderSub);
      console.log(snapshot.val().highPriceSub);
    }
  
    // Else Firebase doesn't have a highPrice/highBidder, so use the initial local values.
    else {
  
      // Change the HTML to reflect the local value in firebase
      $("#highest-bidder").text(highBidder);
      $("#highest-price").text("$" + highPrice);
  
      // Print the local data to the console.
      console.log("local High Price");
      console.log(highBidder);
      console.log(highPrice);
    }
  
  // If any errors are experienced, log them to console.
  }, function(errorObject) {
    console.log("The read failed: " + errorObject.code);
  });
  
  // --------------------------------------------------------------
  
  // Whenever a user clicks the submit-bid button
  $("#submit-bid").on("click", function(event) {
    event.preventDefault();
  
    // Get the input values
    var bidderName = $("#bidder-name").val().trim();
    var bidderPrice = parseInt($("#bidder-price").val().trim());
  
    // Log to console the Bidder and Price (Even if not the highest)
  
  
    if (bidderPrice > highPrice) {
  
      // Alert
      alert("You are now the highest bidder.");
  
      // Save the new price in Firebase
      database.ref("/bidderData").set({//"/bidderData"
        highBidderSub: bidderName,
        highPriceSub: bidderPrice
      });
  
      // Log the new High Price
      console.log("New High Price!");
      console.log(bidderName);
      console.log(bidderPrice);
  
      // Store the new high price and bidder name as a local variable (could have also used the Firebase variable)
      highBidder = bidderName;
      highPrice = parseInt(bidderPrice);
  
      // Change the HTML to reflect the new high price and bidder
      $("#highest-bidder").text(bidderName);
      $("#highest-price").text("$" + bidderPrice);
  
    }
    else {
  
      // Alert
      alert("Sorry that bid is too low. Try again.");
    }
  });

  
  //reference push()

//   let postRef = firebase.database().ref('/post');
// postRef.push({ 'name': 'Test Value' })
//     .then(res => {
//         console.log(res.getKey()) // this will return you ID
//     })
//     .catch(error => console.log(error));