import { ConfigurableModuleBuilder } from "@nestjs/common";
import { HandlebarsModuleOptions } from "./handlebars.module-options";

export const { ConfigurableModuleClass, MODULE_OPTIONS_TOKEN } =
    new ConfigurableModuleBuilder<HandlebarsModuleOptions>({
        moduleName: 'Handlebars'
    })
        .build();