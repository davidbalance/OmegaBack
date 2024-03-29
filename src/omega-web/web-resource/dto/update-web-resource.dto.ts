import { PartialType } from '@nestjs/mapped-types';
import { CreateWebResourceDto } from './create-web-resource.dto';

export class UpdateWebResourceDto extends PartialType(CreateWebResourceDto) {}
