import { Module } from '@nestjs/common';
import { LocalEmailProvider } from './local-email.service';
import { EmailProviderToken } from '@shared/shared/nest/inject';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ZodValidatorFactory } from '@shared/shared/nest/factories';
import localEmailSchema from './config/local-email.schema'
import localEmailConfig from './config/local-email.config';
import { loadMailer, MailerToken } from './local-email.dependecy';

@Module({
  imports: [
    ConfigModule.forRoot({
      cache: true,
      validate: ZodValidatorFactory(localEmailSchema),
      load: [localEmailConfig]
    }),
  ],
  providers: [
    {
      provide: MailerToken,
      useFactory: loadMailer,
      inject: [ConfigService],
    },
    LocalEmailProvider
  ],
  exports: [EmailProviderToken],
})
export class LocalEmailModule { }
