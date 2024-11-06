import { Module } from "@nestjs/common";
import { NEST_HANDLEBARS } from "./inject-token";
import { HandlebarsService } from "./handlebars.service";
import { FSModule } from "../fs/fs.module";
import { PathModule } from "../path/path.module";
import { ConfigurableModuleClass } from "./handlebars.module-definition";
import handlebars from 'handlebars'

@Module({
    imports: [
        PathModule,
        FSModule
    ],
    providers: [
        {
            provide: 'HANDLEBAR_BASE',
            useValue: handlebars
        },
        {
            provide: NEST_HANDLEBARS,
            useClass: HandlebarsService
        },
    ],
    exports: [NEST_HANDLEBARS]
})
export class HandlebarsModule extends ConfigurableModuleClass { }