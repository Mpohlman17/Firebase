$(document).ready(function () {

    var config = {
        apiKey: "AIzaSyC0ZugQzkkM8qILqLlL6YmL4rmjOvGGHHM",
        authDomain: "polh-7de70.firebaseapp.com",
        databaseURL: "https://polh-7de70.firebaseio.com",
        projectId: "polh-7de70",
        storageBucket: "polh-7de70.appspot.com",
        messagingSenderId: "536879888189"
    };
    firebase.initializeApp(config);

    var database = firebase.database();

    // Inital values
    var trainName = "";
    var trainDest = "";
    var firstTrain = "";
    var trainFreq = "";
    var currentTime = moment();

    // clock interval holding consitant time
    setInterval(function () {
        $("#currentTime").html(moment(moment()).format("hh:mm:ss"));
    }, 1000);


    //  buttons for adding trains
    $("#addTrain-btn").on("click", function (event) {
        event.preventDefault();
        // reciving error for .trim()
        trainName = $("#trainName").val();
        trainDest = $("#trainDest").val();
        firstTrain = $("#firstTrain").val();
        trainFreq = $("#trainFreq").val();

        // clear user input from text-boxes
        $("#trainName").val("");
        $("#trainDest").val("");
        $("#firstTrain").val("");
        $("#trainFreq").val("");

        // push data to database
        database.ref().push({
            trainName: trainName,
            trainDest: trainDest,
            firstTrain: firstTrain,
            trainFreq: trainFreq
        });

    });


    // firebase function event to add user input train schedule
    database.ref().on("child_added", function (childSnapshot) {


        // First Time (pushed back 1 year to make sure it comes before current time)
        var firstTimeConverted = moment(childSnapshot.val().firstTrain, "hh:mm").subtract(1, "years");
        console.log(firstTimeConverted);

        // current time
        // var currentTime = moment();
        // console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

        // Difference between the times
        var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
        console.log("DIFFERENCE IN TIME: " + diffTime);


        // Time apart (remainder)
        var tRemainder = diffTime % childSnapshot.val().trainFreq;
        console.log(tRemainder);

        // minutes away mins
        var tMinutesTillTrain = childSnapshot.val().trainFreq - tRemainder;
        console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

        // next arrival time military
        var nextTrain = moment().add(tMinutesTillTrain, "minutes");
        console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));


        // finally adding all the trains data into table
        $("#trainTable > tbody").append("<tr scope=row><td scope=col>" + childSnapshot.val().trainName 
        + "</td><td scope=col>" + childSnapshot.val().trainDest + "</td><td scope=col>" + 
        childSnapshot.val().trainFreq + "</td><td scope=col>" + 
        moment(nextTrain).format("hh:mm") + "</td><td scope=col>" + 
        tMinutesTillTrain + "</td></tr>");

        // if errors are experienced
        // }, function (errorObject) {
        //     console.log("The read failed: " + errorObject.code);

    });
});