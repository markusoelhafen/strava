var strava = require('strava-v3');

// function totalActivities(callback) {
//   strava.athletes.stats({id: 7511175}, function(err, output, callback) {
//     if(!err) {
//       var count = output.all_ride_totals.count + output.all_run_totals.count + output.all_swim_totals.count;
//       //console.log(count);
//       listActivities(count);
//     }
//     else {
//       console.log(err);
//     }
//   });
// }

var totalActivities = strava.athletes.stats({id: 7511175}, function(err, output) {
  if(!err) {
    var count = output.all_ride_totals.count + output.all_run_totals.count + output.all_swim_totals.count;
    //console.log(count);
    listActivities(count);
  }
  else {
    console.log(err);
  }
});

function listActivities(callback) {
  strava.athlete.listActivities({id: 7511175}, per_page: 1)}, function(err, output) {
    if(!err) {
      console.log(output);
    }
    else {
      console.log(err);
    }
  }
}

function run() {

}

// strava.athlete.listActivities({id: 7511175, per_page: 1},function(err,output) {
//   if(!err) {
//     console.log(output);
//     // var activities = Object.keys(output);
//     // console.log(activities.length);
//   }
//   else {
//     console.log(err);
//   }
// });
