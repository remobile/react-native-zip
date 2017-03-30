'use strict';
const { NativeEventEmitter, DeviceEventEmitter, Platform, NativeModules } = require('react-native');
const EventEmitter = Platform.OS === 'android' ? DeviceEventEmitter : new NativeEventEmitter(NativeModules.Zip);
const exec = require('@remobile/react-native-cordova').exec;

function newProgressEvent (result) {
    const event = {
        loaded: result.loaded,
        total: result.total,
    };
    return event;
}

exports.unzip = function (fileName, outputDirectory, callback, progressCallback) {
    let subscription = null;

    if (progressCallback) {
        subscription = EventEmitter.addListener('UnzipProgress', (result) => progressCallback(newProgressEvent(result)));
    }
    const win = function (result) {
        subscription && subscription.remove();
        if (callback) {
            callback(0);
        }
    };
    const fail = function (result) {
        subscription && subscription.remove();
        if (callback) {
            callback(-1);
        }
    };
    exec(win, fail, 'Zip', 'unzip', [fileName, outputDirectory]);
};
