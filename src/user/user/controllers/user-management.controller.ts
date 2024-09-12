import { User } from "@/shared/decorator";
import { Controller, UseGuards, Get, Post, Body, Patch, Param, Delete, Inject } from "@nestjs/common";
import { ApiTags, ApiBearerAuth } from "@nestjs/swagger";
import { plainToInstance } from "class-transformer";
import { UserManagementService } from "../services/user-management.service";
import { GetUserArrayResponseDto } from "../dtos/response/user-array.get.dto";
import { GetUserResponseDto } from "../dtos/response/user.get.dto";
import { PostUserRequestDto } from "../dtos/request/user.post.dto";
import { PatchUserRequestDto } from "../dtos/request/user.patch.dto";
import { JwtAuthGuard } from "@/shared/guards/authentication-guard/guards/jwt-auth.guard";
import { PostUserResponseDto } from "../dtos/response/user.post.dto";

@ApiTags('User>User')
@ApiBearerAuth()
@Controller('users')
@UseGuards(JwtAuthGuard)
export class UserManagementController {
  constructor(
    @Inject(UserManagementService) private readonly userService: UserManagementService
  ) { }

  @Get('user')
  async findOneByToken(
    @User() user: number
  ): Promise<GetUserResponseDto> {
    const foundUser = await this.userService.findOne(user);
    return plainToInstance(GetUserResponseDto, foundUser);
  }

  @Get('user/:id')
  async findOneById(
    @Param('id') id: number
  ): Promise<GetUserResponseDto> {
    const foundUser = await this.userService.findOne(id);
    return plainToInstance(GetUserResponseDto, foundUser);
  }

  @Post()
  async create(
    @Body() body: PostUserRequestDto
  ): Promise<PostUserResponseDto> {
    const data = await this.userService.create(body);
    return plainToInstance(PostUserResponseDto, data);
  }

  @Patch(':id')
  async updateOne(
    @Param('id') id: number,
    @Body() body: PatchUserRequestDto
  ): Promise<any> {
    await this.userService.updateOne(id, body)
    return {}
  }

  @Delete(':id')
  async deleteOne(
    @Param('id') id: number
  ): Promise<any> {
    await this.userService.deleteOne(id);
    return {};
  }
}