$(document).ready(function () {

    var config = {
        apiKey: "AIzaSyDISUwVor5sk2snvk6GtBU0WpqvfPaKZWE",
        authDomain: "train-scheduler-db01e.firebaseapp.com",
        databaseURL: "https://train-scheduler-db01e.firebaseio.com",
        projectId: "train-scheduler-db01e",
        storageBucket: "train-scheduler-db01e.appspot.com",
        messagingSenderId: "184769248717"
    };
    firebase.initializeApp(config);

    var database = firebase.database();

    $("#submit").on("click", function(event) {
        event.preventDefault();
    
        var name = $("#name").val().trim();
        var dest = $("#dest").val().trim();
        var start = $("#start").val().trim();
        var freq = $("#freq").val().trim();

        database.ref().push({
            name: name,
            dest: dest,
            start: start,
            freq: freq,
            dateAdded: firebase.database.ServerValue.TIMESTAMP
        });
    });


    database.ref().on("child_added", function(childSnapshot) {
        console.log(childSnapshot.val().name);
        console.log(childSnapshot.val().dest);
        console.log(childSnapshot.val().start);
        console.log(childSnapshot.val().freq);

        var newName = childSnapshot.val().name;
        var newDest = childSnapshot.val().dest;
        var newStart = childSnapshot.val().start;
        var newFreq = childSnapshot.val().freq;

        // first train time (pushed back 1 year to make sure it comes before current time)
        var startTimeConverted = moment(newStart, "hh:mm").subtract(1, "years");

        var diffTime = moment().diff(moment(startTimeConverted), "minutes");

        var timeRemainder = diffTime % newFreq;

        var minutesAway = newFreq - timeRemainder;

        var nextTrain = moment().add(minutesAway, "minutes");
        var catchTrain = moment(nextTrain).format("HH:mm");

        $("#all-trains").append(
            '<tr><td>' + newName + 
            '</td><td>' + newDest +
            '</td><td>' + newFreq +
            '</td><td>' + catchTrain +
            '</td><td>' + minutesAway + '</td></tr>'
        );

        $("#name, #dest, #start, #freq").val("");
        return false;
    }, function (errorObject) {
        console.log("Errors handled: " + errorObject.code);
    });

});