import { Controller } from '@nestjs/common';
import { WebLogoService } from './web-logo.service';

@Controller('web-logo')
export class WebLogoController {
  constructor(private readonly webLogoService: WebLogoService) { }
}
