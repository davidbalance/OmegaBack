import { Body, Controller, Delete, Get, Param, Patch } from '@nestjs/common';
import { UserService } from './user.service';
import { FindOneAndInactiveUserResponseDTO, FindUserResponseDTO, UpdateUserRequestDTO, UpdateUserResponseDTO } from '@/shared';

@Controller('users')
export class UserController {
  constructor(
    private readonly userService: UserService
  ) { }

  @Get()
  async find(): Promise<FindUserResponseDTO> {
    const users = await this.userService.find();
    const amount = users.length;
    return { amount, users };
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