import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserRequestDTO, FindOneUserAndDeleteResponseDTO, FindOneUserAndUpdateRequestDTO, FindUserResponseDTO, FindUsersResponseDTO } from '../common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { plainToInstance } from 'class-transformer';
import { JwtAuthGuard } from '@/shared/guards/authentication-guard';
import { User } from '@/shared/decorator';

@ApiTags('User')
@ApiBearerAuth()
@Controller('users')
export class UserController {
  constructor(
    private readonly userService: UserService
  ) { }

  @UseGuards(JwtAuthGuard)
  @Get()
  async find(
    @User() user: number
  ): Promise<FindUsersResponseDTO> {
    const users = await this.userService.find(user);
    return plainToInstance(FindUsersResponseDTO, { users });
  }

  @UseGuards(JwtAuthGuard)
  @Get('user')
  async findOne(
    @User() user: number
  ): Promise<FindUserResponseDTO> {
    const foundUser = await this.userService.findOne(user);
    return plainToInstance(FindUserResponseDTO, foundUser);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(
    @Body() body: CreateUserRequestDTO
  ): Promise<FindUserResponseDTO> {
    const user = await this.userService.create(body);
    return plainToInstance(FindUserResponseDTO, user);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  async findOneAndUpdate(
    @Param('id') id: number,
    @Body() body: FindOneUserAndUpdateRequestDTO
  ): Promise<FindUserResponseDTO> {
    const user = await this.userService.findOneAndUpdate(id, body)
    return plainToInstance(FindUserResponseDTO, user);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async findOneAndInactive(
    @Param('id') id: number
  ): Promise<FindOneUserAndDeleteResponseDTO> {
    await this.userService.findOneAndDelete(id);
    return {};
  }
}