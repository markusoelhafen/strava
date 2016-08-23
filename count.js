var strava = require('strava-v3');
var userId = 7511175;
var activityCount = 0;
var args = {
  ride: true,
  run: true,
  swim: false
};


function getActivityCount(id, type, callback) {
  // get the overall stats for an authenticated athlete

  type = type || {ride: true, run: true, swim: false};

  strava.athletes.stats({id: id}, function(err, output) {
    if(err) return;
    if(type.ride) activityCount += output.all_ride_totals.count;
    if(type.run) activityCount += output.all_run_totals.count;
    if(type.swim) activityCount += output.all_swim_totals.count;
    callback();
  })
}

getActivityCount(userId, args, function(){
  console.log(activityCount);
});
