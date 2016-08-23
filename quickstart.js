var strava = require('strava-v3');
var activities = [];
var userId = 7511175;
var activityCount = 0;
var today = new Date();
today = today.getTime();
var milliDifference = 1209600000;


function getActivityCount(id, callback) {
  // get the overall stats for an authenticated athlete
  strava.athletes.stats({id: id}, function(err, output) {
    if(err) {
      console.log(err);
      return;
    }
    // combine all different activity-counts into one sum
    activityCount += output.all_ride_totals.count + output.all_run_totals.count + output.all_swim_totals.count;

    callback(activityCount);
  });
}

function getActivityData(count, callback) {
  console.log("acitivity count: " + count);

  var pagination = Math.ceil(count/200);

  for(pagination; pagination > 0; pagination--){
    // get the information from strava for an authenticated athelete, max. 200 entries each page
    strava.athlete.listActivities({id: userId, page: pagination, per_page: 200}, function(err, output) {
      console.log("getting Data..");
      if(err) {
        console.log(err);
        return;
      }
      else if(output) {
        callback(output);
      }
    });
  }
}

// functions pushes the input data in a specified array
function pushData(input) {
  console.log("pushing data bundles..");
  for(var i = 0; i < input.length; i++){
    activities.push(input[i]);
  }
}

// function logs all objects of an array
function listData(array) {
  console.log("listing all " + activityCount + " activities..");
  array.sort(function(a, b) {
    return (b.id - a.id);
  });
  array.forEach(function(entry){
    var d = new Date(entry.start_date);
    if(today - d.getTime() > milliDifference) {
      console.log(entry.start_date);

    }
  });

}


function sortArray(array, sort, order) {
  array.sort(function(a, b) {
    if(order == "asc"){
      return (a.sort - b.sort);
    }
    else {
      return (b.sort - a.sort);
    }
  });
  console.log(array.sort);
}

// running all functions and passing the output to the next function
getActivityCount(userId, function(activityCount){
  getActivityData(activityCount, function(data){
    pushData(data);
    if(activities.length >= activityCount) {
      listData(activities);
    }
  });
});
