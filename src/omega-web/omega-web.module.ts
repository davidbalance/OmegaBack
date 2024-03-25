import { Module } from '@nestjs/common';
import { WebClientModule } from './web-client/web-client.module';
import { WebRoutesModule } from './web-routes/web-routes.module';

const root = "omega-web"

@Module({
  imports: [
    WebClientModule,
    WebRoutesModule
  ]
})
export class OmegaWebModule { }
