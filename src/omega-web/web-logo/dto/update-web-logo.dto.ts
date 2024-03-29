import { PartialType } from '@nestjs/mapped-types';
import { CreateWebLogoDto } from './create-web-logo.dto';

export class UpdateWebLogoDto extends PartialType(CreateWebLogoDto) {}
