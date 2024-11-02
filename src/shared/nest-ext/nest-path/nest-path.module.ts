import { Global, Module } from "@nestjs/common";
import { NEST_PATH } from "./inject-token";
import path from "path";

@Global()
@Module({
    providers: [
        {
            provide: NEST_PATH,
            useValue: path
        }
    ],
    exports: [NEST_PATH]
})
export class NestPathModule { }