import { Body, Controller, Inject, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { plainToInstance } from 'class-transformer';
import { PatientPaginationService } from '../service/patient-pagination.service';
import { PostPatientPaginationRequestDto } from '../dtos/request/post.patient-pagination.request.dto';
import { PostPatientPagesResponseDto } from '../dtos/response/post.patient-pagination.response.dto';
import { JwtAuthGuard } from '@/shared/guards/authentication-guard/guards/jwt-auth.guard';
import { GetPatientArrayResponseDto } from '../dtos/response/get.patient-array.response.dto';

@ApiTags('User/Patient')
@ApiBearerAuth()
@Controller('patients')
@UseGuards(JwtAuthGuard)
export class PatientPaginationController {
  constructor(
    @Inject(PatientPaginationService) private readonly service: PatientPaginationService
  ) { }

  @Post('paginate')
  async findByFilter(
    @Body() { page, limit, filter, order }: PostPatientPaginationRequestDto
  ): Promise<GetPatientArrayResponseDto> {
    const data = await this.service.findPaginatedByFilter(page, limit, filter, order);
    return plainToInstance(GetPatientArrayResponseDto, { data });
  }

  @Post('pages')
  async findPageCount(
    @Body() { limit, filter }: PostPatientPaginationRequestDto
  ): Promise<PostPatientPagesResponseDto> {
    const pages = await this.service.findPageCount(limit, filter);
    return plainToInstance(PostPatientPagesResponseDto, { pages });
  }
}
