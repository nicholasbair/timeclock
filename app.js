'use strict';

// TODO:
// on stop push time to table
  // create times object
  // add time on stop
  // forEach item, add row w/ time and date

var startTime = null;
var endTime = null;
var resetBtn = getId('resetBtn');
var timeOutput = getId('timeOutput');
var dataRow = getId('dataRow');
var toggleBtn = getId('toggleBtn');
var timePost = getId('timePost');
var startClock;
var timeSheet = [];

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

function getId(id) {
  return document.getElementById(id);
}

function appendZero(n) {
  n = n.toString();
  if (n.length != 2) {
    n = '0' + n;
  }
  return n;
}

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
  var seconds = appendZero(Math.floor((t/1000) % 60));
  var minutes = appendZero(Math.floor((t/1000/60) % 60));
  var hours = appendZero(Math.floor((t/(1000*60*60)) % 24));
  // var calcTime = hours.toString();
  console.log('Hours: ' + hours);
  console.log('minutes: ' + minutes);
  var calcTime = '1.56';

  timeSheet.push([getDate(), calcTime]);
  timeOutput.innerHTML = hours + ':' + minutes + ':' + seconds;
  console.log(timeSheet);
  timeSheet.forEach(function(item) {
    // not adding after 1
    timePost.innerHTML = 'Date: ' + item[0] + ' ' + 'Time: ' + item[1];
  });
}

function newTimer() {
  var timeNow = Date.now();
  var t = timeNow - startTime;
  var seconds = appendZero(Math.floor((t/1000) % 60));
  var minutes = appendZero(Math.floor((t/1000/60) % 60));
  var hours = appendZero(Math.floor((t/(1000*60*60)) % 24));
  timeOutput.innerHTML = hours + ':' + minutes + ':' + seconds;
}
