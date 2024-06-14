import { Controller, Get, UseGuards } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '@/shared/guards/authentication-guard';
import { GETSelectorOptionArrayResponseDTO } from '../dto/selector.response.dto';
import { SelectorService } from '../services/selector.service';

@ApiTags('Location/City', 'Selector')
@ApiBearerAuth()
@Controller('selector/cities')
export class SelectorController {
  constructor(private readonly service: SelectorService) { }

  @UseGuards(JwtAuthGuard)
  @Get()
  async findSelectorOptions(): Promise<GETSelectorOptionArrayResponseDTO> {
    const options = await this.service.find();
    return plainToInstance(GETSelectorOptionArrayResponseDTO, { options });
  }

}
