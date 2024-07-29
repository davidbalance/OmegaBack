import { Body, Controller, Inject, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { plainToInstance } from 'class-transformer';
import { JwtAuthGuard } from '@/shared/guards/authentication-guard';
import { PatientPaginationService } from '../service/patient-pagination.service';
import { PostPatientPaginationRequestDto } from '../dtos/request/post.patient-pagination.request.dto';
import { PostPatientPaginationResponseDto } from '../dtos/response/post.patient-pagination.response.dto';

@ApiTags('User/Patient')
@ApiBearerAuth()
@Controller('patients')
@UseGuards(JwtAuthGuard)
export class PatientPaginationController {
  constructor(
    @Inject(PatientPaginationService) private readonly service: PatientPaginationService
  ) { }

  @Post('paginate')
  async findByFilterAndPagination(
    @Body() { page, limit, filter, order }: PostPatientPaginationRequestDto
  ): Promise<PostPatientPaginationResponseDto> {
    const [pages, data] = await this.service.findPaginatedDataAndPageCount(page, limit, filter, order);
    return plainToInstance(PostPatientPaginationResponseDto, { data, pages });
  }
}
