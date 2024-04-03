import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post
} from '@nestjs/common';
import { RoleService } from './role.service';
import {
  CreateRoleRequestDTO,
  CreateRoleResponseDTO,
  FindOneRoleAndDeleteResponseDTO,
  FindOneRoleAndUpdateRequestDTO,
  FindOneRoleAndUpdateResponseDTO,
  FindRoleResponseDTO,
  FindRolesResponseDTO
} from './dto';
import { plainToInstance } from 'class-transformer';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Authorization')
@Controller('roles')
export class RoleController {
  constructor(private readonly roleService: RoleService) { }

  @Get()
  async find(): Promise<FindRolesResponseDTO> {
    const roles = await this.roleService.find();
    return plainToInstance(FindRolesResponseDTO, { roles });
  }

  @Post()
  async create(
    @Body() body: CreateRoleRequestDTO
  ): Promise<FindRoleResponseDTO> {
    const role = await this.roleService.create(body);
    return plainToInstance(FindRoleResponseDTO, role);
  }

  @Patch(':id')
  async findOneAndUpdate(
    @Param('id') id: number,
    @Body() body: FindOneRoleAndUpdateRequestDTO
  ): Promise<FindOneRoleAndUpdateResponseDTO> {
    await this.roleService.findOneAndUpdate(id, body);
    return {};
  }

  @Delete(':id')
  async findOneAndDelete(
    @Param('id') id: number
  ): Promise<FindOneRoleAndDeleteResponseDTO> {
    await this.roleService.findOneAndDelete(id);
    return {};
  }
}