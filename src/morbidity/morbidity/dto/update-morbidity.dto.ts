import { PartialType } from '@nestjs/mapped-types';
import { CreateMorbidityDto } from './create-morbidity.dto';

export class UpdateMorbidityDto extends PartialType(CreateMorbidityDto) {}
