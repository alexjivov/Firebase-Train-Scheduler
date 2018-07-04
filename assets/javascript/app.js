/* 7/3 - Still need to:
    1. Add the Moment.js time tracking 
    2. Fix the databse not being defined for 'child_added'
*/

var trainName;
var destination;
var trainTime;
var frequency;

// Initialize Firebase
var config = {
    apiKey: "AIzaSyAlM0JpH8u2zoBBzjU__vjdUciu1AgpDiQ",
    authDomain: "train-schedule-973e8.firebaseapp.com",
    databaseURL: "https://train-schedule-973e8.firebaseio.com",
    projectId: "train-schedule-973e8",
    storageBucket: "train-schedule-973e8.appspot.com",
    messagingSenderId: "800420553503"
};

firebase.initializeApp(config);


//  Button for adding train info
$("#add-train-btn").on("click", function (event) {
    event.preventDefault();

    // Saves user input
    var trainName = $("#train-name-input").val().trim();
    var destination= $("#destination-input").val().trim();
    var trainTime = moment($("#time-input").val().trim(), "DD/MM/YY").format("X");
    var frequency = $("#frequency-input").val().trim();
    console.log(this); 

    // local object for train data
    var newTrain = {
        name: trainName,
        destination: destination,
        time: trainTime,
        frequency: frequency,
    };

    // Uploads employee data to the database
    database.ref().push(newTrain);

    console.log(newTrain.trainName);
    console.log(newTrain.destination);
    console.log(newTrain.trainTime);
    console.log(newTrain.frequency);

    // Clears all of the text-boxes
    $("#train-name-input").val("");
    $("#destination-input").val("");
    $("#time-input").val("");
    $("#frequency-input").val("");
});

// adds train data to Firebase and creates an HTML row for the input 
database.ref().on("child_added", function (childSnapshot, prevChildKey) {

    console.log(childSnapshot.val());

    //variables for storing the snapshot
    var trainName = childSnapshot.val().trainName;
    var destination = childSnapshot.val().destination;
    var trainTime = childSnapshot.val().trainTime;
    var frequency = childSnapshot.val().frequency;

    console.log(trainName);
    console.log(destination);
    console.log(trainTime);
    console.log(frequency);

    // Clean up the train time visual 
    // var trainPretty = moment.unix(trainTime).format("MM/DD/YY");

    // Add each train's data into the table
  $("#train-table > tbody").append("<tr><td>" + trainName + "</td><td>" + destination + "</td><td>" +
  trainTime + "</td><td>" + frequency + "</td><td>");

});

