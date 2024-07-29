import { User } from "@/shared/decorator";
import { JwtAuthGuard } from "@/shared/guards/authentication-guard";
import { Controller, UseGuards, Get, Post, Body, Patch, Param, Delete, Inject } from "@nestjs/common";
import { ApiTags, ApiBearerAuth } from "@nestjs/swagger";
import { plainToInstance } from "class-transformer";
import { UserManagementService } from "../services/user-management.service";
import { DELETEUserResponseDto } from "../dtos/delete.user-management.dto";
import { GETUserArrayResponseDto, GETUserResponseDto } from "../dtos/get.user-management.dto";
import { PATCHUserRequestDto, PATCHUserResponseDto } from "../dtos/patch.user-management.dto";
import { POSTUserRequestDto, POSTUserResponseDto } from "../dtos/post.user-management.dto";

@ApiTags('User/User')
@ApiBearerAuth()
@Controller('users')
@UseGuards(JwtAuthGuard)
export class UserManagementController {
  constructor(
    @Inject(UserManagementService) private readonly userService: UserManagementService
  ) { }

  @Get()
  async find(
    @User() user: number
  ): Promise<GETUserArrayResponseDto> {
    const users = await this.userService.find(user);
    return plainToInstance(GETUserArrayResponseDto, { users });
  }

  @Get('user')
  async findOne(
    @User() user: number
  ): Promise<GETUserResponseDto> {
    const foundUser = await this.userService.findOne(user);
    return plainToInstance(GETUserResponseDto, foundUser);
  }

  @Post()
  async create(
    @Body() body: POSTUserRequestDto
  ): Promise<POSTUserResponseDto> {
    const user = await this.userService.create(body);
    return plainToInstance(POSTUserResponseDto, user);
  }

  @Patch(':id')
  async updateOne(
    @Param('id') id: number,
    @Body() body: PATCHUserRequestDto
  ): Promise<PATCHUserResponseDto> {
    const user = await this.userService.updateOne(id, body)
    return plainToInstance(PATCHUserResponseDto, user);
  }

  @Delete(':id')
  async deleteOne(
    @Param('id') id: number
  ): Promise<DELETEUserResponseDto> {
    await this.userService.deleteOne(id);
    return {};
  }
}