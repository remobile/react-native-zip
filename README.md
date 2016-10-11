# React Native Zip (remobile)
A unzip for react-native, code come from cordova, support for android and ios

## Installation
```sh
npm install @remobile/react-native-zip --save
```
### Installation (iOS)
* Drag RCTZip.xcodeproj to your project on Xcode.
* Click on your main project file (the one that represents the .xcodeproj) select Build Phases and drag libRCTZip.a from the Products folder inside the RCTZip.xcodeproj.
* Look for Header Search Paths and make sure it contains both $(SRCROOT)/../../../react-native/React as recursive.

### Installation (Android)
```gradle
...
include ':react-native-zip'
project(':react-native-zip').projectDir = new File(settingsDir, '../node_modules/@remobile/react-native-zip/android/RCTZip')
```

* In `android/app/build.gradle`

```gradle
...
dependencies {
    ...
    compile project(':react-native-zip')
}
```

* register module (in MainApplication.java)

```java
......
import com.remobile.zip.RCTZipPackage;  // <--- import

......

@Override
protected List<ReactPackage> getPackages() {
   ......
   new RCTZipPackage(),            // <------ add here
   ......
}

```

## Usage

### Example
```js
var React = require('react');
var ReactNative = require('react-native');
var {
    StyleSheet,
    View,
    Image,
} = ReactNative;

var Zip = require('@remobile/react-native-zip');
var Button = require('@remobile/react-native-simple-button');

module.exports = React.createClass({
    testUnzip() {
        Zip.unzip('/Users/fang/data/Framework7.zip', '/Users/fang/data/xx/', (z)=>{console.log(z)}, (z)=>{console.log(z)})
        Zip.unzip('/Users/fang/data/Framework71.zip', '/Users/fang/data/yy/', (z)=>{console.log(z)}, (z)=>{console.log(z)})
    },
    render() {
        return (
            <View style={styles.container}>
                <Button onPress={this.testUnzip}>
                    test unzip
                </Button>
            </View>
        );
    },
});


var styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: 'transparent',
    },
});
```

### HELP
* look https://github.com/MobileChromeApps/cordova-plugin-zip


### thanks
* this project come from https://github.com/MobileChromeApps/cordova-plugin-zip

### see detail use
* https://github.com/remobile/react-native-template
