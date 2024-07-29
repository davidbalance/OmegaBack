import { Module } from '@nestjs/common';
import { WebLogoService } from './web-logo.service';
import { WebLogoController } from './web-logo.controller';
import { SqlDatabaseModule } from '@/shared/sql-database';
import { WebLogo } from './entities/web-logo.entity';
import { WebLogoRepository } from './web-logo.repository';

@Module({
  imports: [SqlDatabaseModule.forFeature([WebLogo])],
  controllers: [WebLogoController],
  providers: [
    WebLogoService,
    WebLogoRepository
  ],
  exports: [WebLogoService]
})
export class WebLogoModule { }
