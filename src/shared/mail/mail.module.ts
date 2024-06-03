import { Module } from '@nestjs/common';
import { MailService } from './mail.service';
import { MAIL_TEMPLATE_PATH, MAIL_TEMPLATE_PROVIDER } from './mail.provider';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule],
  providers: [
    {
      provide: MAIL_TEMPLATE_PROVIDER,
      useValue: 'mail.hbs'
    },
    {
      provide: MAIL_TEMPLATE_PATH,
      useValue: 'templates/mail'
    },
    MailService
  ],
  exports: [MailService]
})
export class MailModule { }
