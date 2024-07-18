import { Module } from '@nestjs/common';
import { WebResourceService } from './web-resource.service';
import { WebResourceController } from './web-resource.controller';
import { WebResource } from './entities/web-resource.entity';
import { WebResourceRespository } from './web-resource.repository';
import { AuthenticationGuardModule } from '@/shared/guards/authentication-guard';
import { SqlDatabaseModule } from '@/shared/sql-database';

@Module({
  imports: [
    SqlDatabaseModule.forFeature([WebResource]),
    AuthenticationGuardModule
  ],
  controllers: [WebResourceController],
  providers: [
    WebResourceService,
    WebResourceRespository
  ],
  exports: [WebResourceService]
})
export class WebResourceModule { }
