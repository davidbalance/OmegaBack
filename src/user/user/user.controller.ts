import { Body, Controller, Param } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserRequestDTO, CreateUserResponseDTO, FindOneAndInactiveUserResponseDTO, FindOneUserResponseDTO, FindUserResponseDTO, UpdateUserRequestDTO, UpdateUserResponseDTO } from '@/shared';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) { }

  async create(
    @Body() body: CreateUserRequestDTO
  ): Promise<CreateUserResponseDTO> {
    return;
  }

  async find(): Promise<FindUserResponseDTO> {
    const users = await this.userService.find();
    return { users };
  }

  async findOne(
    @Param('id') id: number
  ): Promise<FindOneUserResponseDTO> {
    const user = await this.userService.findOne({ id });
    return { user };
  }

  async findOneAndUpdate(
    @Param('id') id: number,
    @Body() body: UpdateUserRequestDTO
  ): Promise<UpdateUserResponseDTO> {
    await this.userService.findOneAndUpdate(id, body)
    return;
  }

  async findOneAndInactive(
    @Param('id') id: number
  ): Promise<FindOneAndInactiveUserResponseDTO> {
    await this.userService.findOneAndInactive(id);
    return;
  }
}