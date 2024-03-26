import { Module } from '@nestjs/common';
import { WebClientModule } from './web-client/web-client.module';
import { WebRoutesModule } from './web-routes/web-routes.module';
import { RouterModule } from '@nestjs/core';

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
    ])

  ]
})
export class OmegaWebModule { }
