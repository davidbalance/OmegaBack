import { PartialType } from '@nestjs/mapped-types';
import { CreateWebReportElementDto } from './create-web-report-element.dto';

export class UpdateWebReportElementDto extends PartialType(CreateWebReportElementDto) {}
