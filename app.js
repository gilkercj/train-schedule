$(document).ready(function () {

    
    // Firebase init and API

    var config = {
        apiKey: "AIzaSyDoRjnCDWZ2OmkoHy4ii-bQyyADlOzA_hQ",
        authDomain: "koji-pro.firebaseapp.com",
        databaseURL: "https://koji-pro.firebaseio.com",
        projectId: "koji-pro",
        storageBucket: "koji-pro.appspot.com",
        messagingSenderId: "222843935792"
    };
    firebase.initializeApp(config);



    var send = $("#send");
    var database = firebase.database();

    $(send).on("click", function (event) {

        event.preventDefault();

        var name = $("#train-name").val().trim();
        var dest = $("#train-dest").val().trim();
        var first = $("#first-time").val().trim()//, 'HHmm').format("HHmm"); //Needs to be moment( at begining
        var freq = $("#frequency").val().trim();

        // var firstTime = moment(first). format( "HH:mm:ss")
        console.log("freq: " + freq);
        console.log("HHMMSS tst: " + first);
        var obj = {
            name: name,
            dest: dest,
            first: first,
            freq: freq
        };

        console.log("create test: " + name + dest + first + freq);


        //  pushing data to firebase

        database.ref().push(obj);

        $("#train-name").val("");
        $("#train-dest").val("");
        $("#first-time").val("");
        $("#frequency").val("");

    });

    database.ref().on("child_added", function (childSnapshot, prevChildKey) {

        var name = childSnapshot.val().name;
        var dest = childSnapshot.val().dest;
        var first = childSnapshot.val().first;
        var freq = childSnapshot.val().freq;

        console.log("child test: " + name + dest + first + freq);


        

        var converted = moment(first, "HH:mm");

        var now = moment().format("HH:MM");

        var diff = moment().diff(moment(converted), "minutes");
        console.log("diff test: " + diff);

        var remainder = diff % freq;
        console.log("remain test: " + remainder);

        var eta = freq - remainder;



        var next = moment(moment().add(eta, "minutes")).format("hh:mm a");
   
        // var time;
        // var toHour = moment(freq, 'mmmm').format('hhmm');

        // if (freq > 60) {
        //     var hours = Math.floor(freq / 60);
        //     var minutes = (freq / 60) - hours;
        //     minutes = Math.floor(minutes * 100);
        // } else {
        //     var hours = 00;
        //     var minutes = freq;
        // }
        // console.log("freq/hour test: " + hours + " // " + minutes);
        // var freqTime = hours +""+ minutes;
        // console.log("freq: " + freqTime);

        // console.log("now test: " + now);
        // var next = moment(first + freqTime, "HHmm").format("HH:mm");
        // console.log("next test: " + next);
        // if(now === next){
        //     var eta = moment(first).add(freq, 'm') 
        // }
        // // var eta = "x";
        // // time = 
        $('#init-tbody').append("<tr><td>" + name + "</td><td>" + dest + "</td><td>" + freq + "</td><td>" + next + "</td><td>" + eta + "</td></tr>")
    });



});