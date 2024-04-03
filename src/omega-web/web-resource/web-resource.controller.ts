import { Controller } from '@nestjs/common';
import { WebResourceService } from './web-resource.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Omega Web')
@Controller('omega-web/resources')
export class WebResourceController {
  constructor(private readonly webResourceService: WebResourceService) { }
}
