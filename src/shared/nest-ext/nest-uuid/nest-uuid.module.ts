import { Module } from "@nestjs/common";
import { NEST_UUID } from "./inject-token";
import uuid from 'uuid';

@Module({
    providers: [{
        provide: NEST_UUID,
        useValue: uuid
    }]
})
export class NestUuid { }