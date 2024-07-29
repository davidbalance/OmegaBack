import { JwtAuthGuard } from "@/shared/guards/authentication-guard";
import { Controller, UseGuards, Get, Inject } from "@nestjs/common";
import { ApiTags, ApiBearerAuth } from "@nestjs/swagger";
import { plainToInstance } from "class-transformer";
import { DiseaseGroupSelectorService } from "../services/disease-group-selector.service";
import { GETSelectorOptionArrayResponseDto } from "@/disease/disease/dtos/selector.response.dto";

@ApiTags('Selector', 'Disease/Group')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('selector/diseases/groups')
export class DiseaseGroupSelectorController {
    constructor(
        @Inject(DiseaseGroupSelectorService) private readonly service: DiseaseGroupSelectorService
    ) { }

    @Get()
    async findSelectorOptions(): Promise<GETSelectorOptionArrayResponseDto> {
        const options = await this.service.find();
        return plainToInstance(GETSelectorOptionArrayResponseDto, { options: options });
    }
}