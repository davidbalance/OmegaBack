import { Module } from '@nestjs/common';
import { WebResourceService } from './web-resource.service';
import { WebResourceController } from './web-resource.controller';
import { WebResource } from './entities/web-resource.entity';
import { SqlDatabaseModule } from '@/shared';

@Module({
  imports: [SqlDatabaseModule.forFeature([WebResource])],
  controllers: [WebResourceController],
  providers: [WebResourceService]
})
export class WebResourceModule { }
