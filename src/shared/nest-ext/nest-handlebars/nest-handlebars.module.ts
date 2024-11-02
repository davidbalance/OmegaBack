import { Module } from "@nestjs/common";
import { NEST_HANDLEBARS } from "./inject-token";
import handlebars from 'handlebars';

@Module({
    providers: [{
        provide: NEST_HANDLEBARS,
        useValue: handlebars
    }]
})
export class NestHandlebarsModule { }