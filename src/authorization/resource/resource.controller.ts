import { Controller, Get, Inject } from '@nestjs/common';
import { ResourceService } from './resource.service';
import { FindResourcesResponseDTO } from './dto';
import { plainToInstance } from 'class-transformer';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Authorization')
@Controller('resources')
export class ResourceController {
  constructor(
    @Inject(ResourceService) private readonly resourceService: ResourceService
  ) { }

  @Get()
  async find(): Promise<FindResourcesResponseDTO> {
    const resources = await this.resourceService.find();
    return plainToInstance(FindResourcesResponseDTO, { resources: resources });
  }
}
