import { Module } from "@nestjs/common";
import { FileToken, FileValue } from "./fs.dependency";

@Module({
    providers: [
        {
            provide: FileToken,
            useValue: FileValue
        },
    ],
    exports: [FileToken]
})
export class FSModule { }