import { User } from "@/shared/decorator";
import { Controller, UseGuards, Get, Post, Body, Patch, Param, Delete, Inject } from "@nestjs/common";
import { ApiTags, ApiBearerAuth } from "@nestjs/swagger";
import { plainToInstance } from "class-transformer";
import { UserManagementService } from "../services/user-management.service";
import { GetUserArrayResponseDto } from "../dtos/response/get.user.response.dto";
import { GetUserResponseDto } from "../dtos/response/get.user-array.response.dto";
import { PostUserRequestDto } from "../dtos/request/post.user.request.dto";
import { PostUserResponseDto } from "../dtos/response/post.user.response.dto";
import { PatchUserRequestDto } from "../dtos/request/patch.user.dto";
import { PatchUserResponseDto } from "../dtos/response/patch.user.response.dto";
import { DeleteUserResponseDto } from "../dtos/response/delete.user.response.dto";
import { JwtAuthGuard } from "@/shared/guards/authentication-guard/guards/jwt-auth.guard";

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
  ): Promise<GetUserArrayResponseDto> {
    const data = await this.userService.find(user);
    return plainToInstance(GetUserArrayResponseDto, { data });
  }

  @Get('user')
  async findOne(
    @User() user: number
  ): Promise<GetUserResponseDto> {
    const foundUser = await this.userService.findOne(user);
    return plainToInstance(GetUserResponseDto, foundUser);
  }

  @Post()
  async create(
    @Body() body: PostUserRequestDto
  ): Promise<PostUserResponseDto> {
    const user = await this.userService.create(body);
    return plainToInstance(PostUserResponseDto, user);
  }

  @Patch(':id')
  async updateOne(
    @Param('id') id: number,
    @Body() body: PatchUserRequestDto
  ): Promise<PatchUserResponseDto> {
    const user = await this.userService.updateOne(id, body)
    return plainToInstance(PatchUserResponseDto, user);
  }

  @Delete(':id')
  async deleteOne(
    @Param('id') id: number
  ): Promise<DeleteUserResponseDto> {
    await this.userService.deleteOne(id);
    return {};
  }
}