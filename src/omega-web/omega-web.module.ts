import { Module } from '@nestjs/common';
import { WebClientModule } from './web-client/web-client.module';
import { WebResourceModule } from './web-resource/web-resource.module';
import { WebLogoModule } from './web-logo/web-logo.module';

@Module({
  imports: [
    WebResourceModule,
    WebLogoModule,
    WebClientModule
  ]
})
export class OmegaWebModule { }
