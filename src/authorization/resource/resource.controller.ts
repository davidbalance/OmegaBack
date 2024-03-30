import { Controller, Get, Inject } from '@nestjs/common';
import { ResourceService } from './resource.service';
import { FindResourcesResponseDTO } from './dto';

@Controller('resources')
export class ResourceController {
  constructor(
    @Inject(ResourceService) private readonly resourceService: ResourceService
  ) { }

  @Get()
  async find(): Promise<FindResourcesResponseDTO> {
    const resources = await this.resourceService.find();
    return { resources };
  }
}
