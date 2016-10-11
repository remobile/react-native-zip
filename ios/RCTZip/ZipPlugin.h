#import <Foundation/Foundation.h>
#import "CDVPlugin.h"
#import "SSZipArchive.h"

@interface ZipPlugin : CDVPluginEventEmitter <SSZipArchiveDelegate>

- (void)unzip:(CDVInvokedUrlCommand*)command;
- (void)zipArchiveWillUnzipFileAtIndex:(NSInteger)fileIndex totalFiles:(NSInteger)totalFiles archivePath:(NSString *)archivePath fileInfo:(unz_file_info)fileInfo;

@end
