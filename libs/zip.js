
var React = require('react-native');
var { NativeAppEventEmitter, DeviceEventEmitter} = React;
var exec = require('@remobile/react-native-cordova').exec;

var jobId = 0;

var getJobId = () => {
  jobId += 1;
  return jobId;
};

function newProgressEvent(result) {
    var event = {
            loaded: result.loaded,
            total: result.total
    };
    return event;
}

exports.unzip = function(fileName, outputDirectory, callback, progress) {
    var jobId = getJobId();
    var subscription;

    if (progress) {
      if (NativeAppEventEmitter.addListener)
        subscription = NativeAppEventEmitter.addListener('UnzipProgress-' + jobId, progress);
      if (DeviceEventEmitter.addListener)
        subscription = DeviceEventEmitter.addListener('UnzipProgress-' + jobId, progress);
    }

    var win = function(result) {
        console.log(result);
        subscription.remove();
        callback&&callback(0);
    };
    var fail = function(result) {
        console.log(result);
        subscription.remove();
        callback&&callback(-1);
    };
    exec(win, fail, 'Zip', 'unzip', [fileName, outputDirectory, jobId]);
};
