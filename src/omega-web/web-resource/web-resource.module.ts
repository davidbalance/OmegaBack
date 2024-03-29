import { Module } from '@nestjs/common';
import { WebResourceService } from './web-resource.service';
import { WebResourceController } from './web-resource.controller';

@Module({
  controllers: [WebResourceController],
  providers: [WebResourceService]
})
export class WebResourceModule {}
