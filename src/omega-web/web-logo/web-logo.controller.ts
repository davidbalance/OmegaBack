import { Controller } from '@nestjs/common';
import { WebLogoService } from './web-logo.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Omega/Web/Logo')
@Controller('omega/web/logo')
export class WebLogoController {
  constructor(private readonly webLogoService: WebLogoService) { }
}
