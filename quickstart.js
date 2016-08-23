var strava = require('strava-v3');
var activities = [];
var userId = 7511175;
var activityCount;


function getActivityCount(id, callback) {
  // get the overall stats for an authenticated athlete
  strava.athletes.stats({id: id}, function(err, output) {
    if(err) {
      console.log(err);
      return;
    }
    // combine all different activity-counts into one sum
    activityCount = output.all_ride_totals.count + output.all_run_totals.count + output.all_swim_totals.count;

    callback(activityCount);
  });
}

function getActivityData(count, callback) {
  console.log("acitivity count: " + count);

  var pagination = Math.ceil(count/200);
  pages = pagination;

  for(pagination; pagination > 0; pagination--){
    console.log(pagination + " getting Data..");
    // get the information from strava for an authenticated athelete, max. 200 entries each page
    strava.athlete.listActivities({id: userId, page: pagination, per_page: 200}, function(err, output) {
      if(err) {
        console.log(err);
        return;
      }
      callback(output);
    });
  }
}

// functions pushes the input data in a specified array
function pushData(array, data, callback) {
  console.log("pushing data..");
  for(var i = 0; i < data.length; i++){
    array.push(data[i]);
  }
}

// function logs all objects of an array
function listData(array) {
  console.log("listing all " + activityCount + " activities..");
  console.log(array);
}

// running all functions and passing the output to the next function
getActivityCount(userId, function(count){
  getActivityData(count, function(data){
    pushData(activities, data);
    if(activities.length >= activityCount) {
      listData(activities);
    }
  });
});
