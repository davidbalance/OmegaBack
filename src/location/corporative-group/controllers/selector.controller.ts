import { Controller, Get, UseGuards } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '@/shared/guards/authentication-guard';
import { SelectorService } from '../services/selector.service';
import { GETSelectorOptionArrayResponseDTO } from '../dtos/selector.response.dto';

@ApiTags('Location/Corporative/Group', 'Selector')
@ApiBearerAuth()
@Controller('selector/corporative/groups')
export class SelectorController {
  constructor(private readonly service: SelectorService) { }

  @UseGuards(JwtAuthGuard)
  @Get()
  async findSelectorOptions(): Promise<GETSelectorOptionArrayResponseDTO> {
    const options = await this.service.find();
    return plainToInstance(GETSelectorOptionArrayResponseDTO, { options });
  }
}
