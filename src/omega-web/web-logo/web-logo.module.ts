import { SqlDatabaseModule } from '@/shared/sql-database/sql-database.module';
import { Module } from '@nestjs/common';
import { WebLogo } from './entities/web-logo.entity';
import { WebLogoRepository } from './repositories/web-logo.repository';
import { WebLogoService } from './services/web-logo.service';

@Module({
  imports: [SqlDatabaseModule.forFeature([WebLogo])],
  providers: [
    WebLogoRepository,
    WebLogoService,
  ],
  exports: [
    WebLogoService
  ]
})
export class WebLogoModule { }
