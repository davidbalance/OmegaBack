import { Controller, Get, Inject, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '@/shared/guards/authentication-guard';
import { ApiTags } from '@nestjs/swagger';
import { plainToInstance } from 'class-transformer';
import { GetNavResourceArrayResponseDto } from '../dtos/response/get.nav-resource-array.response.dto';
import { NavResourceService } from '../services/nav-resource.service';

@ApiTags('Omega/Web/Resource')
@UseGuards(JwtAuthGuard)
@Controller('omega/nav/resources')
export class NavResourceController {
  constructor(
    @Inject(NavResourceService) private readonly service: NavResourceService
  ) { }

  @Get()
  async findAll(): Promise<GetNavResourceArrayResponseDto> {
    const data = await this.service.findAll();
    return plainToInstance(GetNavResourceArrayResponseDto, { data });
  }
}
