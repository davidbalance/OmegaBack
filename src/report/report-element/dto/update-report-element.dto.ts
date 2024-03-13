import { PartialType } from '@nestjs/mapped-types';
import { CreateReportElementDto } from './create-report-element.dto';

export class UpdateReportElementDto extends PartialType(CreateReportElementDto) {}
