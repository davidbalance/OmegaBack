import { Controller } from '@nestjs/common';
import { MorbidityGroupService } from './morbidity-group.service';

@Controller('morbidity-group')
export class MorbidityGroupController {
  constructor(private readonly morbidityGroupService: MorbidityGroupService) { }
}
