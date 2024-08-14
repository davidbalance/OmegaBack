import { Controller, Get, Param, Inject, UseGuards, Delete, Patch, Body, Post } from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { plainToInstance } from 'class-transformer';
import { GetMedicalEmailArrayResponseDto } from '../dtos/response/get.medical-email-array.response.dto';
import { PostMedicalEmailRequestDto } from '../dtos/request/post.medical-email.request.dto';
import { PostMedicalEmailResponseDto } from '../dtos/response/post.medical-email.response.dto';
import { DeleteMedicalEmailResponseDto } from '../dtos/response/delete.medical-email.response.dto';
import { MedicalClientEmailService } from '../services/medical-client-email.service';
import { GetMedicalEmailResponseDto } from '../dtos/response/get.medical-email.response.dto';
import { JwtAuthGuard } from '@/shared/guards/authentication-guard/guards/jwt-auth.guard';

@ApiTags('Medical/Client')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('medical/client/email')
export class MedicalClientEmailController {
  constructor(
    @Inject(MedicalClientEmailService) private readonly service: MedicalClientEmailService
  ) { }

  @Get(':dni')
  async findAllByDni(
    @Param('dni') dni: string
  ): Promise<GetMedicalEmailArrayResponseDto> {
    const data = await this.service.findAllByDni(dni);
    return plainToInstance(GetMedicalEmailArrayResponseDto, { data });
  }

  @Post(':dni')
  async createEmail(
    @Param('dni') dni: string,
    @Body() body: PostMedicalEmailRequestDto
  ): Promise<PostMedicalEmailResponseDto> {
    const data = await this.service.assignEmail(dni, body);
    return plainToInstance(PostMedicalEmailResponseDto, data);
  }

  @Patch(':id')
  async updateEmailDefault(
    @Param('id') id: number
  ): Promise<GetMedicalEmailResponseDto> {
    const email = await this.service.updateEmailDefault(id);
    return plainToInstance(GetMedicalEmailResponseDto, email);
  }

  @Delete(':id')
  async deleteOne(
    @Param('id') id: number
  ): Promise<DeleteMedicalEmailResponseDto> {
    await this.service.deleteOne(id);
    return {}
  }
}
