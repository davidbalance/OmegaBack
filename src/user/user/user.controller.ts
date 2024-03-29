import { Body, Controller, Delete, Get, Param, Patch } from '@nestjs/common';
import { UserService } from './user.service';
import { FindOneUserAndDeleteResponseDTO, FindOneUserAndUpdateRequestDTO, FindOneUserAndUpdateResponseDTO, FindUsersResponseDTO } from '../common';

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