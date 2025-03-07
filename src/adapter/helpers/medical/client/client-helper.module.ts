import { Module } from "@nestjs/common";
import { RecordFilenameHelperToken, RecordLayoutHelperToken } from "@omega/medical/nest/inject/function.inject";
import { FSModule, PathModule } from "@shared/shared/common";
import { recordLayoutHelper } from "./record-layout.helper";
import { reportFilenameHelper } from "./record-filename.helper";

@Module({
    imports: [PathModule, FSModule],
    providers: [
        {
            provide: RecordLayoutHelperToken,
            useValue: recordLayoutHelper
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