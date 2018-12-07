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
        freq: freq
    });
});

database.ref().orderByChild("dateAdded").limitToLast(100).on("child_added", function(snapshot) {
    console.log(snapshot.val().name);
    
    var tRow = $("<tr>");
    
    var nameTd = $("<td>").text(snapshot.val().name);
    var destTd = $("<td>").text(snapshot.val().dest);
    var freqTd = $("<td>").text(snapshot.val().freq);
    var nextTd = $("<td>").text(snapshot.val().next);
    var minTd = $("<td>").text(snapshot.val().min);

    tRow.append(nameTd, destTd, freqTd, nextTd, minTd);
    
    $("tbody").append(tRow);
});

function renderTrains(list) {
    // add for loop

    var tRow = $("<tr>");
    
    var nameTd = $("<td>").text(list.name);
    var destTd = $("<td>").text(list.dest);
    var freqTd = $("<td>").text(list.freq);
    var nextTd = $("<td>").text(list.next);
    var minTd = $("<td>").text(list.min);
    
    tRow.append(nameTd, destTd, freqTd, nextTd, minTd);
    
    $("tbody").append(tRow);
}

// list = {
//     name: "train",
//     dest: "NYC",
//     freq: "30",
//     next: "12:30 AM",
//     min: "5"
// }

// renderTrains(list);

