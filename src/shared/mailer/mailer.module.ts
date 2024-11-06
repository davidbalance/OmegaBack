import { Global, Module } from '@nestjs/common';
import { ConfigurableModuleClass } from './mailer.module-definition';
import { MailerService } from './mailer.service';
import { NodemailerModule } from '../nest-ext/nodemailer/nodemailer.module';

@Global()
@Module({
    imports: [
        NodemailerModule
    ],
    providers: [MailerService],
    exports: [MailerService]
})
export class MailerModule extends ConfigurableModuleClass { }