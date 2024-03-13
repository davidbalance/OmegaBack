import { PartialType } from '@nestjs/mapped-types';
import { CreateMorbidityGroupDto } from './create-morbidity-group.dto';

export class UpdateMorbidityGroupDto extends PartialType(CreateMorbidityGroupDto) {}
