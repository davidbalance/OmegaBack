import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './entities/user.entity';
import { UpdateUserRequestDTO } from 'src/shared';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Get()
  async readAll(): Promise<User[]> {
    return await this.userService.readAll();
  }

  @Get('user/:id')
  async readOneByID(
    @Param() id: number
  ): Promise<User> {
    return await this.userService.readOneByID(id);
  }

  @Get('dni/:dni')
  async readOneByDNI(
    @Param() dni: string
  ): Promise<User> {
    return await this.userService.readOneByDNI(dni);
  }

  @Patch('user/:id')
  async updateOne(
    @Param('id') id: number,
    @Body() body: UpdateUserRequestDTO
  ): Promise<void> {
    await this.userService.update(id, body);
  }

  @Delete('user/:id')
  async inactiveOne(
    @Param('id') id: number
  ): Promise<void> {
    await this.userService.inactive(id);
  }
}
