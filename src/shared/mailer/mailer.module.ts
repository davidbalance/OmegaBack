import { Global, Module } from '@nestjs/common';
import { ConfigurableModuleClass } from './mailer.module-definition';
import { MailerService } from './mailer.service';
import { NestNodemailerModule } from '../nest-ext/nest-nodemailer/nest-nodemailer.module';

@Global()
@Module({
    imports: [
        NestNodemailerModule
    ],
    providers: [MailerService],
    exports: [MailerService]
})
export class MailerModule extends ConfigurableModuleClass { }