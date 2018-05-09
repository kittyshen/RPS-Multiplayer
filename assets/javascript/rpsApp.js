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


// Create a variable to reference the database
var database = firebase.database();

//create a globe variable to reference current database image so we can use later as a easy reference point
var currentDataSnap ;

database.ref("/Players").on("value",function(snapshot){
    console.log(snapshot.val());
    currentDataSnap = snapshot.val();
});

// initial testing object
// var obj = {
//     1:{trainName : "express", trainDest : "meow planet", trainFirst: "07:00", trainFreq:"30" },
//     // 2:{trainName : "express2", trainDest : "meow planet", trainFirst: "08:00", trainFreq:"20" },
//     // 3:{trainName : "express3", trainDest : "meow planet", trainFirst: "09:00", trainFreq:"10" },
//     // 4:{trainName : "express4", trainDest : "meow planet", trainFirst: "09:00", trainFreq:"10" },
// }

// database.ref("/trainInfo").set(obj);
// console.log(currentDataSnap);

//create the train display table

    
    //grab data from database
database.ref("/Players").on("value", function (snapshot) {
    // console.log(snapshot.val());
    //store reference of current database image 
    currentDataSnap = snapshot.val();

    for (var prop in snapshot.val()) {
        if (parseInt(prop) > maxEntry) {
            maxEntry = parseInt(prop);  //keeptrack of the current max index number of entries on firbase server
        }
        // console.log(snapshot.val()[prop]);
        var trainName = snapshot.val()[prop].trainName;
        var trainDest = snapshot.val()[prop].trainDest;
        var trainFirst = snapshot.val()[prop].trainFirst;
        var trainFreq = snapshot.val()[prop].trainFreq;
        var nextTrain;
        nextTrain = calcNextTrain(trainFirst, trainFreq);
        // var trainArrive =
        newDataRow(trainName, trainDest, trainFreq, nextTrain[0], nextTrain[1]);
    }
});

var maxEntry =1;  // use this to keep track of train entry index

//Deal with add new train form
$("#add-user").on("click",function(event){
    event.preventDefault();

    //grab the value from the user input on the add train form and save it as a new 
    //key/value pair into the current currentDataSnap object
    // currentDataSnap[newEntryIndex] = {
    //     trainName: newTrainName,
    //     trainDest: newTrainDest,
    //     trainFirst: newTrainFirst,
    //     trainFreq: newTrainFreq,
    // }
    // //write the currentDataSnap object back to the firebase server
    // database.ref("/trainInfo").set(currentDataSnap);
    //end of click envet

    //rerender the table
    renderTrainTable(database);
    $("#name-input").val("");
    $("#destination-input").val("");
    $("#firstTrain-input").val("");
    $("#frequency-input").val("");
});
