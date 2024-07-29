import { Controller, Get, Param, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { JwtAuthGuard } from "@/shared/guards/authentication-guard";
import { plainToInstance } from "class-transformer";
import { DiseaseSelectorService } from "../services/disease-selector.service";
import { GETSelectorOptionArrayResponseDto } from "../dtos/selector.response.dto";

@ApiTags('Selector', 'Disease/Disease')
@ApiBearerAuth()
@Controller('selector/diseases')
export class DiseaseSelectorController {
    constructor(private readonly service: DiseaseSelectorService) { }

    @UseGuards(JwtAuthGuard)
    @Get('by/group/:group')
    async findSelectorOptions(
        @Param("group") group: number
    ): Promise<GETSelectorOptionArrayResponseDto> {
        const options = await this.service.find(group);
        return plainToInstance(GETSelectorOptionArrayResponseDto, { options: options });
    }
}