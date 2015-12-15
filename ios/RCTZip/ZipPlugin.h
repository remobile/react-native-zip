#import <Foundation/Foundation.h>
#import "CDVPlugin.h"
#import "SSZipArchive.h"

@interface ZipPlugin : CDVPlugin
- (void)unzip:(CDVInvokedUrlCommand*)command;
@end
