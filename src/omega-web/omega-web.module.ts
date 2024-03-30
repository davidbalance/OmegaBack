import { Module } from '@nestjs/common';
import { WebClientModule } from './web-client/web-client.module';
import { RouterModule } from '@nestjs/core';
import { WebResourceModule } from './web-resource/web-resource.module';
import { WebLogoModule } from './web-logo/web-logo.module';
import { WebReportElementModule } from './web-report-element/web-report-element.module';

const root = "omega-web"

@Module({
  imports: [
    WebResourceModule,
    WebReportElementModule,
    WebLogoModule,
    WebClientModule
  ]
})
export class OmegaWebModule { }
