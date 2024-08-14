import { Module } from '@nestjs/common';
import { AuthenticationGuardModule } from '@/shared/guards/authentication-guard';
import { SqlDatabaseModule } from '@/shared/sql-database/sql-database.module';
import { WebResourceController } from './controllers/web-resource.controller';
import { WebResource } from './entities/web-resource.entity';
import { WebResourceRespository } from './repositories/web-resource.repository';
import { WebResourceService } from './services/web-resource.service';
import { NavResourceController } from './controllers/nav-resource.controller';
import { NavResourceService } from './services/nav-resource.service';

@Module({
  imports: [
    SqlDatabaseModule.forFeature([WebResource]),
    AuthenticationGuardModule
  ],
  controllers: [
    NavResourceController,
    WebResourceController,
  ],
  providers: [
    WebResourceRespository,
    NavResourceService,
    WebResourceService,
  ],
  exports: [
    WebResourceService
  ]
})
export class WebResourceModule { }
