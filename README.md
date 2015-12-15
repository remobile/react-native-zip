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
project(':react-native-zip').projectDir = new File(rootProject.projectDir, '../node_modules/@remobile/react-native-zip/android/RCTZip')
```

* In `android/app/build.gradle`

```gradle
...
dependencies {
    ...
    compile project(':react-native-zip')
}
```

* register module (in MainActivity.java)

```java
import com.remobile.zip.*;  // <--- import

public class MainActivity extends Activity implements DefaultHardwareBackBtnHandler {
  ......

  @Override
  protected void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);
    mReactRootView = new ReactRootView(this);

    mReactInstanceManager = ReactInstanceManager.builder()
      .setApplication(getApplication())
      .setBundleAssetName("index.android.bundle")
      .setJSMainModuleName("index.android")
      .addPackage(new MainReactPackage())
      .addPackage(new RCTZipPackage())              // <------ add here
      .setUseDeveloperSupport(BuildConfig.DEBUG)
      .setInitialLifecycleState(LifecycleState.RESUMED)
      .build();

    mReactRootView.startReactApplication(mReactInstanceManager, "ExampleRN", null);

    setContentView(mReactRootView);
  }

  ......

}
```

## Usage

### Example
```js
var React = require('react-native');
var {
    StyleSheet,
    View,
    Image,
} = React;

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
