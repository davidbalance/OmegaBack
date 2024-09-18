import { Controller, Get, Post, Body, Patch, Param, Delete, Inject, UseGuards } from '@nestjs/common';
import { SessionService } from '../services/session.service';
import { PostSessionRequestDto } from '../dto/request/session.post.dto';
import { plainToInstance } from 'class-transformer';
import { GetSessionResponseDto } from '../dto/response/get.session.response.dto';
import { PatchSessionRequestDto } from '../dto/request/session.patch.dto';
import { ApiTags, ApiHeader } from '@nestjs/swagger';
import { SessionGuard } from '../guards/session.guard';
import { PostSessionResponseDto } from '../dto/response/session.post.dto';

@ApiTags('Session')
@ApiHeader({ name: 'x-client-key', allowEmptyValue: false, required: true })
@UseGuards(SessionGuard)
@Controller('session')
export class SessionController {
  constructor(
    @Inject(SessionService) private readonly service: SessionService
  ) { }

  @Post()
  async create(
    @Body() data: PostSessionRequestDto
  ): Promise<PostSessionResponseDto> {
    const session = await this.service.create(data);
    return plainToInstance(PostSessionResponseDto, { session });
  }

  @Get(':session')
  async findOne(
    @Param('session') session: string
  ): Promise<GetSessionResponseDto> {
    const currentSession = await this.service.findOne(session);
    return plainToInstance(GetSessionResponseDto, currentSession);
  }

  @Patch(':session')
  async updateOne(
    @Param('session') session: string,
    @Body() data: PatchSessionRequestDto
  ): Promise<any> {
    await this.service.updateOne(session, data);
    return {};
  }

  @Delete(':session')
  async deleteOne(
    @Param('session') session: string,
  ): Promise<any> {
    await this.service.deleteOne(session);
    return {};
  }
}