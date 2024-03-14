import { PartialType } from '@nestjs/mapped-types';
import { CreateCorporativeGroupDto } from './create-corporative-group.dto';

export class UpdateCorporativeGroupDto extends PartialType(CreateCorporativeGroupDto) {}
