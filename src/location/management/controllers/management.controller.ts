import { JwtAuthGuard } from "@/shared/guards/authentication-guard";
import { Controller, Inject, UseGuards, Get, Post, Body, Patch, Param, Delete } from "@nestjs/common";
import { ApiTags, ApiBearerAuth } from "@nestjs/swagger";
import { plainToInstance } from "class-transformer";
import { DELETEManagementResponseDto } from "../dtos/delete.management.dto";
import { GETManagementArrayResponseDto } from "../dtos/get.management.dto";
import { PATCHManagementRequestDto, PATCHManagementResponseDto } from "../dtos/patch.management.dto";
import { POSTManagementRequestDto, POSTManagementResponseDto } from "../dtos/post.management.dto";
import { ManagementService } from "../services/management.service";

@ApiTags('Location/Management')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('management')
export class ManagementController {
  constructor(
    @Inject(ManagementService) private readonly service: ManagementService
  ) { }

  @Get()
  async findAll(): Promise<GETManagementArrayResponseDto> {
    const data = await this.service.find();
    return plainToInstance(GETManagementArrayResponseDto, { data });
  }

  @Post()
  async create(@Body() createManagementDto: POSTManagementRequestDto): Promise<POSTManagementResponseDto> {
    const management = await this.service.create(createManagementDto);
    return plainToInstance(POSTManagementResponseDto, management);
  }

  @Patch(':id')
  async update(
    @Param('id') id: number,
    @Body() updateManagementDto: PATCHManagementRequestDto
  ): Promise<PATCHManagementResponseDto> {
    const management = await this.service.updateOne(id, updateManagementDto);
    return plainToInstance(POSTManagementResponseDto, management);
  }

  @Delete(':id')
  async findOneAndDelete(
    @Param('id') id: string
  ): Promise<DELETEManagementResponseDto> {
    await this.service.deleteOne(+id);
    return {};
  }
}
