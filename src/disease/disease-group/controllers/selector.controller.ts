import { JwtAuthGuard } from "@/shared/guards/authentication-guard";
import { Controller, UseGuards, Get } from "@nestjs/common";
import { ApiTags, ApiBearerAuth } from "@nestjs/swagger";
import { plainToInstance } from "class-transformer";
import { GETSelectorOptionArrayResponseDTO } from "../dtos/selector.response.dto";
import { SelectorService } from "../services/selector.service";


@ApiTags('Selector', 'Disease/Group')
@ApiBearerAuth()
@Controller('selector/diseases/groups')
export class SelectorController {
    constructor(private readonly service: SelectorService) { }

    @UseGuards(JwtAuthGuard)
    @Get()
    async findSelectorOptions(): Promise<GETSelectorOptionArrayResponseDTO> {
        const options = await this.service.find();
        return plainToInstance(GETSelectorOptionArrayResponseDTO, { options: options });
    }
}