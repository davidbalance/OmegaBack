import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './entities/user.entity';
import { UpdateUserRequestDTO } from 'src/shared';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) { }
}
