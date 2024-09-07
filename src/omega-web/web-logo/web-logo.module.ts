import { SqlDatabaseModule } from '@/shared/sql-database/sql-database.module';
import { Module } from '@nestjs/common';
import { WebLogoRepository } from './repositories/web-logo.repository';
import { WebLogoService } from './services/web-logo.service';
import { WebLogoEntity } from './entities/web-logo.entity';

@Module({
  imports: [SqlDatabaseModule.forFeature([
    WebLogoEntity
  ])],
  providers: [
    WebLogoRepository,
    WebLogoService,
  ],
  exports: [
    WebLogoService
  ]
})
export class WebLogoModule { }
