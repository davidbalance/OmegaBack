import { Module } from '@nestjs/common';
import { WebLogoService } from './web-logo.service';
import { WebLogoController } from './web-logo.controller';
import { SqlDatabaseModule } from '@/shared';
import { WebLogo } from './entities/web-logo.entity';

@Module({
  imports: [SqlDatabaseModule.forFeature([WebLogo])],
  controllers: [WebLogoController],
  providers: [WebLogoService]
})
export class WebLogoModule { }
