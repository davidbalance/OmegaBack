import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post
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

@ApiTags('User')
@Controller('users')
export class UserController {
  constructor(
    private readonly userService: UserService
  ) { }

  @Get()
  async find(): Promise<FindUsersResponseDTO> {
    const users = await this.userService.find();
    return plainToInstance(FindUsersResponseDTO, { users });
  }

  @Post()
  async create(
    @Body() body: CreateUserRequestDTO
  ): Promise<FindUserResponseDTO> {
    const user = await this.userService.create(body);
    return plainToInstance(FindUserResponseDTO, user);
  }

  @Patch(':id')
  async findOneAndUpdate(
    @Param('id') id: number,
    @Body() body: FindOneUserAndUpdateRequestDTO
  ): Promise<FindUserResponseDTO> {
    const user = await this.userService.findOneAndUpdate(id, body)
    return plainToInstance(FindUserResponseDTO, user);
  }

  @Delete(':id')
  async findOneAndInactive(
    @Param('id') id: number
  ): Promise<FindOneUserAndDeleteResponseDTO> {
    await this.userService.findOneAndDelete(id);
    return {};
  }
}