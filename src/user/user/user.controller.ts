import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards
} from '@nestjs/common';
import { UserService } from './user.service';
import {
  CreateUserRequestDTO,
  CreateUserResponseDTO,
  FindOneUserAndDeleteResponseDTO,
  FindOneUserAndUpdateRequestDTO,
  FindOneUserAndUpdateResponseDTO,
  FindUserResponseDTO,
  FindUsersResponseDTO
} from '../common';
import { ApiTags } from '@nestjs/swagger';
import { plainToInstance } from 'class-transformer';
import { JwtAuthGuard } from '@/shared/guards/authentication-guard';

@ApiTags('User')
@Controller('users')
export class UserController {
  constructor(
    private readonly userService: UserService
  ) { }

  @UseGuards(JwtAuthGuard)
  @Get()
  async find(): Promise<FindUsersResponseDTO> {
    const users = await this.userService.find();
    return plainToInstance(FindUsersResponseDTO, { users });
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