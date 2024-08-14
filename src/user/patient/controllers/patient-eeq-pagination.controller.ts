import { Body, Controller, Inject, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { plainToInstance } from 'class-transformer';
import { PostPatientEeqPaginationRequestDto } from '../dtos/request/post.patient-eeq-pagination.request.dto';
import { PostPatientEeqPaginationResponseDto } from '../dtos/response/post.patient-eeq-pagination.response.dto';
import { PatientEeqPaginationService } from '../service/patient-eeq-pagination.service';
import { JwtAuthGuard } from '@/shared/guards/authentication-guard/guards/jwt-auth.guard';

@ApiTags('User/Patient/EEQ')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('patients/eeq')
export class PatientEeqPaginationController {
  constructor(
    @Inject(PatientEeqPaginationService) private readonly service: PatientEeqPaginationService
  ) { }

  @Post('paginate')
  async findByFilterAndPagination(
    @Body() { page, limit, filter, order }: PostPatientEeqPaginationRequestDto
  ): Promise<PostPatientEeqPaginationResponseDto> {
    const [pages, data] = await this.service.findPaginatedDataAndPageCount(page, limit, filter, order);
    return plainToInstance(PostPatientEeqPaginationResponseDto, { pages, data });
  }
}