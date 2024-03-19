import { Controller } from '@nestjs/common';
import { MorbidityService } from './morbidity.service';

@Controller('morbidity')
export class MorbidityController {
  constructor(private readonly morbidityService: MorbidityService) { }
}
