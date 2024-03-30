import { Controller } from '@nestjs/common';
import { WebResourceService } from './web-resource.service';

@Controller('resource')
export class WebResourceController {
  constructor(private readonly webResourceService: WebResourceService) { }
}
