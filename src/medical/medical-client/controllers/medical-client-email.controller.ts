import { Controller, Get, Param, Inject, UseGuards, Delete, Patch, Body, Post } from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { plainToInstance } from 'class-transformer';
import { GetMedicalEmailArrayResponseDto } from '../dtos/response/medical-email-array.get.dto';
import { PostMedicalEmailRequestDto } from '../dtos/request/medical-email.post.dto';
import { MedicalClientEmailService } from '../services/medical-client-email.service';
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
  ): Promise<any> {
    const data = await this.service.assignEmail(dni, body);
    return {}
  }

  @Patch(':id')
  async updateEmailDefault(
    @Param('id') id: number
  ): Promise<any> {
    const email = await this.service.updateEmailDefault(id);
    return {}
  }

  @Delete(':id')
  async deleteOne(
    @Param('id') id: number
  ): Promise<any> {
    await this.service.deleteOne(id);
    return {}
  }
}
