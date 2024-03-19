import { Controller } from '@nestjs/common';
import { CorporativeGroupService } from './corporative-group.service';

@Controller('corporative-group')
export class CorporativeGroupController {
  constructor(private readonly corporativeGroupService: CorporativeGroupService) { }
}
