import { Controller, Get, Param } from '@nestjs/common';
import { ResultService } from './result.service';
import { FindResultsByDoctor } from '../common/dtos';

@Controller('results')
export class ResultController {
  constructor(private readonly resultService: ResultService) { }

  @Get('doctor/:doctor')
  async find(
    @Param('doctor') doctor: number
  ): Promise<FindResultsByDoctor> {
    const results = await this.resultService.findResultsByDoctor(doctor);
    return { results }
  }
}
