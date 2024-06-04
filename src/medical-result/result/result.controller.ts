import { Body, Controller, Get, Header, Param, Patch, StreamableFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { ResultService } from './result.service';
import { FindOneResultAndUpdateDiseaseRequestDTO, InsertMedicalReportRequestDTO } from '../common/dtos/result.request.dto';
import { Authorize, User } from '@/shared/decorator';
import { plainToInstance } from 'class-transformer';
import { FindOneResultAndUpdateDiseaseResponseDTO, FindResultResponseDTO, FindResultsResponseDTO } from '../common/dtos';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '@/shared/guards/authentication-guard';
import { AuthorizationGuard } from '@/shared/guards/authorization-guard/authorization.guard';
import { ClaimEnum } from '@/shared';
import { DniInterceptor } from '@/shared/interceptors/dni/dni.interceptor';

@ApiTags('Medical Result')
@ApiBearerAuth()
@Controller('results')
export class ResultController {
  constructor(private readonly resultService: ResultService) { }

  @Authorize(ClaimEnum.READ, 'medical-result')
  @UseGuards(JwtAuthGuard, AuthorizationGuard)
  @Get()
  async find(): Promise<FindResultsResponseDTO> {
    const results = await this.resultService.find();
    return plainToInstance(FindResultsResponseDTO, { results: results });
  }
  
  @Authorize(ClaimEnum.READ, 'medical-result')
  @UseGuards(JwtAuthGuard, AuthorizationGuard)
  @UseInterceptors(DniInterceptor)
  @Get('doctor')
  async findByDoctor(
    @User() user: string
  ): Promise<FindResultsResponseDTO> {
    const results = await this.resultService.findResultsByDoctor(user);
    return plainToInstance(FindResultsResponseDTO, { results: results });
  }

  @Authorize(ClaimEnum.UPDATE, 'medical-result')
  @UseGuards(JwtAuthGuard, AuthorizationGuard)
  @Patch(':id')
  async findOneResultAndUpdateDisease(
    @Param('id') id: number,
    @Body() body: FindOneResultAndUpdateDiseaseRequestDTO
  ): Promise<FindOneResultAndUpdateDiseaseResponseDTO> {
    await this.resultService.findOneResultAndUpdateDisease(id, body);
    return {};
  }

  @Authorize(ClaimEnum.CREATE, 'medical-report')
  @UseGuards(JwtAuthGuard, AuthorizationGuard)
  @Patch('report/:id')
  async insertMedicalReport(
    @Param('id') id: number,
    @Body() body: InsertMedicalReportRequestDTO
  ): Promise<FindResultResponseDTO> {
    const result = await this.resultService.insertMedicalReport(id, body);
    return plainToInstance(FindResultResponseDTO, result);
  }
}
