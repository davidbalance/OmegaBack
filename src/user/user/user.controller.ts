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
  FindUsersResponseDTO
} from '../common';

@Controller('users')
export class UserController {
  constructor(
    private readonly userService: UserService
  ) { }

  @Get()
  async find(): Promise<FindUsersResponseDTO> {
    const users = await this.userService.find();
    return { users };
  }

  @Post()
  async create(
    @Body() body: CreateUserRequestDTO
  ): Promise<CreateUserResponseDTO> {
    const user = await this.userService.create(body);
    return { user: user.id };
  }

  @Patch(':id')
  async findOneAndUpdate(
    @Param('id') id: number,
    @Body() body: FindOneUserAndUpdateRequestDTO
  ): Promise<FindOneUserAndUpdateResponseDTO> {
    await this.userService.findOneAndUpdate(id, body)
    return;
  }

  @Delete(':id')
  async findOneAndInactive(
    @Param('id') id: number
  ): Promise<FindOneUserAndDeleteResponseDTO> {
    await this.userService.findOneAndDelete(id);
    return;
  }
}