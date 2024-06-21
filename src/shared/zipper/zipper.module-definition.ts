import { ConfigurableModuleBuilder } from "@nestjs/common";
import { ZipperModuleOptions } from "./zipper.interface";

export const { ConfigurableModuleClass, MODULE_OPTIONS_TOKEN } =
    new ConfigurableModuleBuilder<ZipperModuleOptions>({
        moduleName: 'Zipper'
    })
        .build();