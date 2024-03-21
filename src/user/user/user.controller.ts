import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserRequestDTO, CreateUserResponseDTO, FindOneAndInactiveUserResponseDTO, FindOneUserResponseDTO, FindUserResponseDTO, UpdateUserRequestDTO, UpdateUserResponseDTO } from '@/shared';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Post()
  async create(
    @Body() body: CreateUserRequestDTO
  ): Promise<CreateUserResponseDTO> {
    return;
  }

  @Get()
  async find(): Promise<FindUserResponseDTO> {
    const users = await this.userService.find();
    return { users };
  }

  @Get(':id')
  async findOne(
    @Param('id') id: number
  ): Promise<FindOneUserResponseDTO> {
    const user = await this.userService.findOne({ id });
    return { user };
  }

  @Patch(':id')
  async findOneAndUpdate(
    @Param('id') id: number,
    @Body() body: UpdateUserRequestDTO
  ): Promise<UpdateUserResponseDTO> {
    await this.userService.findOneAndUpdate(id, body)
    return;
  }

  @Delete(':id')
  async findOneAndInactive(
    @Param('id') id: number
  ): Promise<FindOneAndInactiveUserResponseDTO> {
    await this.userService.findOneAndInactive(id);
    return;
  }
}