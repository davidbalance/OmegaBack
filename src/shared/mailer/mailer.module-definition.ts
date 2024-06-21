import { ConfigurableModuleBuilder } from "@nestjs/common";
import { MailerModuleOptions } from "./mailer.interface";

export const { ConfigurableModuleClass, MODULE_OPTIONS_TOKEN } =
    new ConfigurableModuleBuilder<MailerModuleOptions>({
        moduleName: 'Mailer'
    })
        .build();