#import "ZipPlugin.h"

@interface ZipArchiveDelegate : NSObject  <SSZipArchiveDelegate>
@property (nonatomic, assign) int jobId;
@property (nonatomic, weak) RCTBridge *bridge;

- (id)initWithJobId:(int)jobId andBridge:(RCTBridge *)bridge;
- (void)zipArchiveWillUnzipFileAtIndex:(NSInteger)fileIndex totalFiles:(NSInteger)totalFiles archivePath:(NSString *)archivePath fileInfo:(unz_file_info)fileInfo;
@end

@implementation ZipArchiveDelegate
- (id)initWithJobId:(int)jobId andBridge:(RCTBridge *)bridge {
    self = [super init];
    if (self) {
        self.jobId = jobId;
        self.bridge = bridge;
    }
    return self;
}

- (void)zipArchiveWillUnzipFileAtIndex:(NSInteger)fileIndex totalFiles:(NSInteger)totalFiles archivePath:(NSString *)archivePath fileInfo:(unz_file_info)fileInfo
{
    NSMutableDictionary* message = [NSMutableDictionary dictionaryWithCapacity:2];
    [message setObject:[NSNumber numberWithLongLong:fileIndex] forKey:@"loaded"];
    [message setObject:[NSNumber numberWithLongLong:totalFiles] forKey:@"total"];
    
    [self.bridge.eventDispatcher sendAppEventWithName:[NSString stringWithFormat:@"UnzipProgress-%d", self.jobId] body:message];
}
@end

@implementation ZipPlugin
@synthesize bridge = _bridge;

RCT_EXPORT_MODULE(Zip)

RCT_EXPORT_CORDOVA_METHOD(unzip);

- (NSString *)pathForURL:(NSString *)urlString
{
    // Attempt to use the File plugin to resolve the destination argument to a
    // file path.
    NSString *path = urlString;
    // If that didn't work for any reason, assume file: URL.
    if (path == nil) {
        if ([urlString hasPrefix:@"file:"]) {
            path = [[NSURL URLWithString:urlString] path];
        }
    }
    return path;
}

- (void)unzip:(CDVInvokedUrlCommand*)command
{
    [self.commandDelegate runInBackground:^{
        CDVPluginResult* pluginResult = nil;
        
        @try {
            NSString *zipURL = [command.arguments objectAtIndex:0];
            NSString *destinationURL = [command.arguments objectAtIndex:1];
            int jobId = [[command.arguments objectAtIndex:2]intValue];
            ZipArchiveDelegate *delegate = [[ZipArchiveDelegate alloc]initWithJobId:jobId andBridge:self.bridge];
            NSError *error;

            NSString *zipPath = [self pathForURL:zipURL];
            NSString *destinationPath = [self pathForURL:destinationURL];

            if([SSZipArchive unzipFileAtPath:zipPath toDestination:destinationPath overwrite:YES password:nil error:&error delegate:delegate]) {
                pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK];
            } else {
                NSLog(@"%@ - %@", @"Error occurred during unzipping", [error localizedDescription]);
                pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_ERROR messageAsString:@"Error occurred during unzipping"];
            }
        } @catch(NSException* exception) {
            NSLog(@"%@ - %@", @"Error occurred during unzipping", [exception debugDescription]);
            pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_ERROR messageAsString:@"Error occurred during unzipping"];
        }
        
        [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
    }];
}
@end
