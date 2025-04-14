import { Module } from "@nestjs/common";
import { PathToken, PathValue } from "./path.dependency";

@Module({
    providers: [
        {
            provide: PathToken,
            useValue: PathValue
        },
    ],
    exports: [PathToken]
})
export class PathModule { }