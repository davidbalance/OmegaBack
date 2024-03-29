import { Module } from '@nestjs/common';
import { WebLogoService } from './web-logo.service';
import { WebLogoController } from './web-logo.controller';

@Module({
  controllers: [WebLogoController],
  providers: [WebLogoService]
})
export class WebLogoModule {}
