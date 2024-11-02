import { Global, Module } from "@nestjs/common";
import { NEST_FS } from "./inject-token";
import fs from 'fs'

@Global()
@Module({
    providers: [{
        provide: NEST_FS,
        useValue: fs
    }],
    exports: [NEST_FS]
})
export class NestFS { }