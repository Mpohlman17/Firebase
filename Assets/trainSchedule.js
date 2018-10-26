$(document).ready(function () {

    var config = {
        apiKey: "AIzaSyDbrWjlqjdQM5G76uTYEPGkp4POohbp_C4",
        authDomain: "trainscheduleapplication.firebaseapp.com",
        databaseURL: "https://trainscheduleapplication.firebaseio.com",
        projectId: "trainscheduleapplication",
        storageBucket: "",
        messagingSenderId: "282927607823"
    };
    firebase.initializeApp(config);

    var database = firebase.database();

    // have set preloaded variables that provide few current trains



    //  buttons for adding trains
    $("#add-train-btn").on("click", function (event) {
        event.preventDefault();

        // define variables that Obtain user input;

        var trainName= $("#trainNameInput").val().trim();
        var trainDest= $("#destInput").val().trim();

    });

// hold train data that user input


// push data to database


// clear user input from text-boxes


// firebase function event to add user input train schedule


// update individual row for each event entry


// time variable


// current time


// train Arrival time


// frequency of train time in min


// next arrival time military

// minutes away mins

// finally adding all the trains data into table



});