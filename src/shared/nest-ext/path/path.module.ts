import { Module } from "@nestjs/common";
import { NEST_PATH } from "./inject-token";
import path from "path";

@Module({
    providers: [
        {
            provide: NEST_PATH,
            useValue: path
        }
    ],
    exports: [NEST_PATH]
})
export class PathModule { }
