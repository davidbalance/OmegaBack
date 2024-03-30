import { Controller } from '@nestjs/common';
import { WebResourceService } from './web-resource.service';

@Controller('omega-web/resources')
export class WebResourceController {
  constructor(private readonly webResourceService: WebResourceService) { }
}
