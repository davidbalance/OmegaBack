import { Module } from "@nestjs/common";
import { NEST_ARCHIVER } from "./inject-token";
import archiver from "archiver";

@Module({
    providers: [{
        provide: NEST_ARCHIVER,
        useValue: archiver
    }],
    exports: [NEST_ARCHIVER]
})
export class ArchiverModule { }
