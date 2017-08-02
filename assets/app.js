 	
var config = {
    apiKey: "AIzaSyBk61uXhSLgbVxGVRmAStjWn-AUIFGD7bo",
    authDomain: "train-schedule-45b27.firebaseapp.com",
    databaseURL: "https://train-schedule-45b27.firebaseio.com",
    projectId: "train-schedule-45b27",
    storageBucket: "",
    messagingSenderId: "39336525259"
  };
  firebase.initializeApp(config);

var database = firebase.database();

var trainName;
var destination;
var firstTrain;
var frequency;
var minutesAway;

var firstTrainConverted;
var currentTime;
var diffTime;
var tRemainder;

var nextTrain;
var nextTrainFormatted;



database.ref().on("child_added", function(snapshot){

    var a = $("<tr>");


    var b = $("<th>");
        b.append(snapshot.val().trainName);

    var c = $("<th>");
        c.append(snapshot.val().destination);

    var d = $("<th>");
        d.append(snapshot.val().frequency);

    var e = $("<th>");
        e.append(snapshot.val().next);

    var f = $("<th>");
        f.append(snapshot.val().minutesAway);


    a.append(b,c,d,e,f);

    $("#data").append(a);
	

});

$("#submit").on("click",function(){
	trainName = $("#train-name").val().trim();
	destination = $("#destination").val().trim();
	firstTrain = $("#firstTrain").val().trim();
	frequency = $("#frequency").val().trim();

          firstTrainConverted = moment(firstTrain, "hh:mm").subtract(1, "years");
          currentTime = moment();
          diffTime = moment().diff(moment(firstTrainConverted), "minutes");
          tRemainder = diffTime % frequency;
          minutesAway = frequency - tRemainder;
          nextTrain = moment().add(minutesAway, "minutes");
          nextTrainFormatted = moment(nextTrain).format("hh:mm");


    database.ref().push({
      trainName: trainName,
      destination: destination,
      frequency: frequency,
      next: nextTrainFormatted,
      minutesAway: minutesAway,
    });



  event.preventDefault();
});

