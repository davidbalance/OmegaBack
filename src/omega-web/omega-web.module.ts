import { Module } from '@nestjs/common';
import { WebClientModule } from './web-client/web-client.module';
import { WebRoutesModule } from './web-routes/web-routes.module';
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
        module: WebRoutesModule,
      },
      {
        path: root,
        module: WebClientModule,
      }
    ]),
    WebResourceModule,
    WebLogoModule,
    WebReportElementModule

  ]
})
export class OmegaWebModule { }
