import { Module } from '@nestjs/common';
import { loadCompiler } from './load-compiler';
import { HtmlLoaderToken, HtmlLoaderValue } from './html-loader.dependencies';
import { HtmlLoaderProviderToken } from '@shared/shared/nest/inject';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ZodValidatorFactory } from '@shared/shared/nest/factories';
import htmlLoaderConfig from './config/html-loader.config';
import htmlLoaderSchema from './config/html-loader.schema';
import { FileToken, FSModule, PathModule, PathToken } from '@shared/shared/common';

@Module({
  imports: [
    ConfigModule.forRoot({
      cache: true,
      validate: ZodValidatorFactory(htmlLoaderSchema),
      load: [htmlLoaderConfig]
    }),
    FSModule,
    PathModule
  ],
  providers: [
    {
      provide: HtmlLoaderToken,
      useValue: HtmlLoaderValue
    },
    {
      provide: HtmlLoaderProviderToken,
      useFactory: loadCompiler,
      inject: [ConfigService, FileToken, PathToken, HtmlLoaderToken]
    }
  ],
  exports: [HtmlLoaderProviderToken],
})
export class HtmlLoaderModule { }
