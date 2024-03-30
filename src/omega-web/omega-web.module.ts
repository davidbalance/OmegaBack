import { Module } from '@nestjs/common';
import { WebClientModule } from './web-client/web-client.module';
import { RouterModule } from '@nestjs/core';
import { WebResourceModule } from './web-resource/web-resource.module';
import { WebLogoModule } from './web-logo/web-logo.module';
import { WebReportElementModule } from './web-report-element/web-report-element.module';

const root = "omega-web"

@Module({
  imports: [
    RouterModule.register([
      {
        path: root,
        module: WebResourceModule,
      },
      {
        path: root,
        module: WebReportElementModule,
      },
      {
        path: root,
        module: WebLogoModule,
      },
      {
        path: root,
        module: WebClientModule,
      }
    ])

  ]
})
export class OmegaWebModule { }
