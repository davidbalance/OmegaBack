import { PartialType } from '@nestjs/mapped-types';
import { CreateReportValueDto } from './create-report-value.dto';

export class UpdateReportValueDto extends PartialType(CreateReportValueDto) {}
