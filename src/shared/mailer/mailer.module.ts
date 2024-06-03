import { Module } from '@nestjs/common';
import { ConfigurableModuleClass } from './mailer.module-definition';
import { MailerService } from './mailer.service';

@Module({
    providers: [MailerService],
    exports: [MailerService]
})
export class MailerModule extends ConfigurableModuleClass { }