import { Module } from "@nestjs/common";
import { RecordFilenameHelperToken, RecordLayoutHelperToken } from "@omega/medical/nest/inject/function.inject";
import { FileToken, FileType, FSModule, PathModule, PathToken, PathType } from "@shared/shared/common";
import { recordLayoutHelper } from "./record-layout.helper";
import { reportFilenameHelper } from "./record-filename.helper";
import { ClientRecordLayoutFunc } from "@omega/medical/application/commands/client/client-add-record.command";

@Module({
    imports: [FSModule, PathModule],
    providers: [
        {
            provide: RecordLayoutHelperToken,
            useFactory: (argPath: PathType, argFile: FileType): ClientRecordLayoutFunc => {
                const imagePath = argPath.resolve('static/images/omega-variant.png');
                const imgBuffer = argFile.readFileSync(imagePath);
                const base64Header = `data:image/png;base64,${imgBuffer.toString('base64')}`

                return recordLayoutHelper(base64Header);
            },
            inject: [PathToken, FileToken]
        },
        {
            provide: RecordFilenameHelperToken,
            useValue: reportFilenameHelper
        }
    ],
    exports: [
        RecordLayoutHelperToken,
        RecordFilenameHelperToken

    ]
})
export class ClientHelperModule { }