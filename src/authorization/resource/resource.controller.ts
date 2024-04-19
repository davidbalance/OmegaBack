import { Controller, Get, Inject, UseGuards } from '@nestjs/common';
import { ResourceService } from './resource.service';
import { FindResourcesResponseDTO } from './dto';
import { plainToInstance } from 'class-transformer';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '@/shared/guards/authentication-guard';
import { Authorize } from '@/shared/decorator';
import { ClaimEnum } from '@/shared';

@ApiTags('Authorization')
@ApiBearerAuth()
@Controller('resources')
export class ResourceController {
  constructor(
    @Inject(ResourceService) private readonly resourceService: ResourceService
  ) { }

  @Authorize(ClaimEnum.READ, 'resource')
  @UseGuards(JwtAuthGuard)
  @Get()
  async find(): Promise<FindResourcesResponseDTO> {
    const resources = await this.resourceService.find();
    return plainToInstance(FindResourcesResponseDTO, { resources: resources });
  }
}
