import { Controller, Post, Body, Patch, Param } from '@nestjs/common';
import { WebRoutesService } from './web-routes.service';
import { CreateWebRouteRequestDTO, CreateWebRouteResponseDTO, UpdateWebRouteRequestDTO, UpdateWebRouteResponseDTO } from './dto';

@Controller('web-routes')
export class WebRoutesController {
  constructor(private readonly routesService: WebRoutesService) { }

  @Post()
  async create(@Body() createRoute: CreateWebRouteRequestDTO): Promise<CreateWebRouteResponseDTO> {
    await this.routesService.create(createRoute);
    return;
  }

  @Patch(':id')
  async findOneAndUpdate(
    @Param('id') id: number,
    @Body() updateRoute: UpdateWebRouteRequestDTO
  ): Promise<UpdateWebRouteResponseDTO> {
    const routes = this.routesService.findOneAndUpdate(id, updateRoute);;
    return;
  }
}
