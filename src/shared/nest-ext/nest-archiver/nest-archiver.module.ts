import { Module } from "@nestjs/common";
import { NEST_ARCHIVER } from "./inject-token";
import archiver from "archiver";

@Module({
    providers: [{
        provide: NEST_ARCHIVER,
        useFactory: () => archiver('zip', { zlib: { level: 9 } })
    }],
    exports: [NEST_ARCHIVER]
})
export class NestArchiver { }