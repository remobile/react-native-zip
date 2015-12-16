
var {NativeAppEventEmitter, DeviceEventEmitter, Platform} = require('react-native');
var EventEmitter = Platform.OS==="android"?DeviceEventEmitter:NativeAppEventEmitter;
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
        subscription = EventEmitter.addListener('UnzipProgress-' + jobId, (result)=>progress(newProgressEvent(result)));
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
