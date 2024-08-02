import { JwtAuthGuard } from "@/shared/guards/authentication-guard";
import { Controller, Inject, UseGuards, Get, Post, Body, Patch, Param, Delete } from "@nestjs/common";
import { ApiTags, ApiBearerAuth } from "@nestjs/swagger";
import { plainToInstance } from "class-transformer";
import { ManagementService } from "../services/management.service";
import { PatchMagementRequestDto } from "../dtos/request/patch.management.request.dto";
import { PostManagementRequestDto } from "../dtos/request/post.management.request.dto";
import { GetManagementArrayResponseDto } from "../dtos/response/get.management-array.response.dto";
import { PostManagementResponseDto } from "../dtos/response/post.management.response.dto";
import { PatchManagementResponseDto } from "../dtos/response/patch.management.response.dto";
import { DeleteManagementResponseDto } from "../dtos/response/delete.management.response.dto";

@ApiTags('Location/Management')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('management')
export class ManagementController {
  constructor(
    @Inject(ManagementService) private readonly service: ManagementService
  ) { }

  @Get()
  async findAll(): Promise<GetManagementArrayResponseDto> {
    const data = await this.service.find();
    return plainToInstance(GetManagementArrayResponseDto, { data });
  }

  @Post()
  async create(
    @Body() createManagementDto: PostManagementRequestDto
  ): Promise<PostManagementResponseDto> {
    const management = await this.service.create(createManagementDto);
    return plainToInstance(PostManagementResponseDto, management);
  }

  @Patch(':id')
  async update(
    @Param('id') id: number,
    @Body() updateManagementDto: PatchMagementRequestDto
  ): Promise<PatchManagementResponseDto> {
    const management = await this.service.updateOne(id, updateManagementDto);
    return plainToInstance(PatchManagementResponseDto, management);
  }

  @Delete(':id')
  async findOneAndDelete(
    @Param('id') id: string
  ): Promise<DeleteManagementResponseDto> {
    await this.service.deleteOne(+id);
    return {};
  }
}
