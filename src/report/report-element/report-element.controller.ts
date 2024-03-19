import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ReportElementService } from './report-element.service';

@Controller('report-element')
export class ReportElementController {
  constructor(private readonly reportElementService: ReportElementService) {}
}
