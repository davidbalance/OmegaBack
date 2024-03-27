import { Body, Controller, Get, Param, Patch } from '@nestjs/common';
import { ResultService } from './result.service';
import { FindOneResultAndInsertMorbidityResponseDTO, FindResultResponseDTO } from '@/shared';

@Controller('results')
export class ResultController {
  constructor(private readonly resultService: ResultService) { }

  @Get()
  async find(): Promise<FindResultResponseDTO> {
    const results = await this.resultService.find();
    return { results }
  }

  @Patch(':id')
  async findOneAndAInsertMorbidity(
    @Param('id') id: number,
    @Body() body: FindOneResultAndInsertMorbidityResponseDTO
  ): Promise<FindOneResultAndInsertMorbidityResponseDTO> {
    await this.resultService.updateMorbidity(id, body.morbidity);
    return;
  }
}
