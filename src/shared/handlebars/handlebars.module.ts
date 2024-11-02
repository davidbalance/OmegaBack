import { Module } from '@nestjs/common';
import { HandlebarsService } from './handlebars.service';
import { NestHandlebarsModule } from '../nest-ext/nest-handlebars/nest-handlebars.module';
import { ConfigurableModuleClass } from './handlebars.module-definition';

@Module({
  imports: [NestHandlebarsModule],
  providers: [HandlebarsService],
  exports: [HandlebarsService]
})
export class HandlebarsModule extends ConfigurableModuleClass { }
