import { Controller, Get, Inject, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { plainToInstance } from 'class-transformer';
import { GetNavResourceArrayResponseDto } from '../dtos/response/get.nav-resource-array.response.dto';
import { NavResourceService } from '../services/nav-resource.service';
import { JwtAuthGuard } from '@/shared/guards/authentication-guard/guards/jwt-auth.guard';

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
