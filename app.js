'use strict';

// TODO:
  // Add table with time data from Firebase

require('dotenv').config();
var h = require('./helpers');
var firebase = new Firebase(process.env.FIREBASE_URL);

var startTime = null;
var endTime = null;
var resetBtn = h.getId('resetBtn');
var timeOutput = h.getId('timeOutput');
var toggleBtn = h.getId('toggleBtn');
var timeSheet = h.getId('timeSheet');
var startClock;

toggleBtn.addEventListener('click', function() {
  if (startTime === null && endTime === null) {
    startTime = Date.now();
    startClock = setInterval(newTimer, 1000);
  } else if (startTime !== null) {
    endTime = Date.now();
    clearInterval(startClock);
    getElapsedTime(startTime, endTime);
  }
});

resetBtn.addEventListener('click', function() {
  startTime = null;
  endTime = null;
  clearInterval(startClock);
  timeOutput.innerHTML = '00:00:00';
});

function getDate() {
  var today = new Date();
  var dd = today.getDate();
  var mm = today.getMonth()+1;
  var yyyy = today.getFullYear();

  if (dd < 10) {
    dd = '0' + dd
  }

  if (mm < 10) {
    mm = '0' + mm
  }

  today = mm+'/'+dd+'/'+yyyy;
  return today
}

function getElapsedTime(start, end) {
  var t = end - start;
  var seconds = h.appendZero(Math.floor((t/1000) % 60));
  var minutes = h.appendZero(Math.floor((t/1000/60) % 60));
  var hours = h.appendZero(Math.floor((t/(1000*60*60)) % 24));
  var calcTime = hours.toString();

  firebase.push({
    date: getDate(),
    time: calcTime
  });
  timeOutput.innerHTML = hours + ':' + minutes + ':' + seconds;
}

function newTimer() {
  var timeNow = Date.now();
  var t = timeNow - startTime;
  var seconds = h.appendZero(Math.floor((t/1000) % 60));
  var minutes = h.appendZero(Math.floor((t/1000/60) % 60));
  var hours = h.appendZero(Math.floor((t/(1000*60*60)) % 24));

  timeOutput.innerHTML = hours + ':' + minutes + ':' + seconds;
}

// TODO: not working, date === undefined
function writeToPage(data) {
  data = data.val();
  for (var prop in data) {
    var date = prop.date;
    timeSheet.innerHTML = '<div>' + date + '</div>';
  }
}

firebase.on('value', function(data) {
  console.log(data.val());
  writeToPage(data);
}, function(err) {
  console.log(err.code);
});
