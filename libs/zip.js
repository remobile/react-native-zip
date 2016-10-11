
var {NativeEventEmitter, DeviceEventEmitter, Platform, NativeModules} = require('react-native');
var EventEmitter = Platform.OS==="android"?DeviceEventEmitter:new NativeEventEmitter(NativeModules.Zip);
var exec = require('@remobile/react-native-cordova').exec;

function newProgressEvent(result) {
    var event = {
            loaded: result.loaded,
            total: result.total
    };
    return event;
}

exports.unzip = function(fileName, outputDirectory, callback, progressCallback) {
    var subscription = null;

    if (progressCallback) {
        subscription = EventEmitter.addListener('UnzipProgress', (result)=>progressCallback(newProgressEvent(result)));
    }
    var win = function(result) {
        subscription && subscription.remove();
        if (callback) {
            callback(0);
        }
    };
    var fail = function(result) {
        subscription && subscription.remove();
        if (callback) {
            callback(-1);
        }
    };
    exec(win, fail, 'Zip', 'unzip', [fileName, outputDirectory]);
};
