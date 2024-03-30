import { Module } from '@nestjs/common';
import { WebResourceService } from './web-resource.service';
import { WebResourceController } from './web-resource.controller';
import { WebResource } from './entities/web-resource.entity';
import { SqlDatabaseModule } from '@/shared';
import { WebResourceRespository } from './web-resource.repository';

@Module({
  imports: [SqlDatabaseModule.forFeature([WebResource])],
  controllers: [WebResourceController],
  providers: [
    WebResourceService,
    WebResourceRespository
  ],
  exports: [WebResourceService]
})
export class WebResourceModule { }
