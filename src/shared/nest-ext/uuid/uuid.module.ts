import { Module } from "@nestjs/common";
import { NEST_UUID } from "./inject-token";
import * as uuid from 'uuid';

@Module({
    providers: [{
        provide: NEST_UUID,
        useValue: uuid
    }],
    exports: [NEST_UUID]
})
export class UuidModule { }
