import { JwtAuthGuard } from "@/shared/guards/authentication-guard";
import { Controller, UseGuards, Get } from "@nestjs/common";
import { ApiTags, ApiBearerAuth } from "@nestjs/swagger";
import { plainToInstance } from "class-transformer";
import { GETSelectorOptionArrayResponseDto } from "../dtos/selector.response.dto";
import { SelectorService } from "../services/disease-group-selector.service";


@ApiTags('Selector', 'Disease/Group')
@ApiBearerAuth()
@Controller('selector/diseases/groups')
export class SelectorController {
    constructor(private readonly service: SelectorService) { }

    @UseGuards(JwtAuthGuard)
    @Get()
    async findSelectorOptions(): Promise<GETSelectorOptionArrayResponseDto> {
        const options = await this.service.find();
        return plainToInstance(GETSelectorOptionArrayResponseDto, { options: options });
    }
}