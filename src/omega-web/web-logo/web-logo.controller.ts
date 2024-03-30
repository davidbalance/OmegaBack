import { Controller } from '@nestjs/common';
import { WebLogoService } from './web-logo.service';

@Controller('omega-web/web-logo')
export class WebLogoController {
  constructor(private readonly webLogoService: WebLogoService) { }
}
