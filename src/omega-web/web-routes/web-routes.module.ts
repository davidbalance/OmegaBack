import { Module } from '@nestjs/common';
import { WebRoutesService } from './web-routes.service';
import { WebRoutesController } from './web-routes.controller';
import { WebRoutesRepository } from './web-routes.repository';
import { SqlDatabaseModule } from '@/shared';
import { WebRoute } from './entities/web-route.entity';

@Module({
  imports: [SqlDatabaseModule.forFeature([WebRoute])],
  controllers: [WebRoutesController],
  providers: [WebRoutesService, WebRoutesRepository],
  exports: [WebRoutesService]
})
export class WebRoutesModule { }
