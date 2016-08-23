var strava = require('strava-v3')
  , activities = []
  , userId = 7511175;


function getActivityCount(id, callback) {
  var count;
  // get the overall stats for an authenticated athlete
  strava.athletes.stats({id: id}, function(err, output) {
    if(err) {
      console.log(err);
      return;
    }
    // combine all different activity-counts into one sum
    count = output.all_ride_totals.count + output.all_run_totals.count + output.all_swim_totals.count;

    callback(count);
  });
}

function getActivityData(count, callback) {
  console.log("acitivity count: " + count);

  var pagination = Math.ceil(count/200);

  for(pagination; pagination > 0; pagination--){
    console.log(pagination + " getting Data..");
    // get the information from strava for an authenticated athelete, max. 200 entries each page
    strava.athlete.listActivities({id: 7511175, page: pagination, per_page: 1}, function(err, output) {
      if(err) {
        console.log(err);
        return;
      }
      callback(output);
    });
  }
}

// functions pushes the input data in a specified array
function pushData(array, data) {
  console.log("pushing data..");
  console.log(data[0].id);
  array.push(data);
}

// function logs all objects of an array
function listData(array, callback) {
  console.log("listing activities..");
}

function run() {
  getActivityCount(userId, function(count){
    getActivityData(count, function(data){
      pushData(activities, data);
      console.log(activities.length);
    });
  });
  callback();
}
