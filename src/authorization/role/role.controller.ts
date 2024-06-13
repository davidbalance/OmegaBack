import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { RoleService } from './role.service';
import {
  CreateRoleRequestDTO,
  FindOneRoleAndDeleteResponseDTO,
  FindOneRoleAndUpdateRequestDTO,
  FindOneRoleAndUpdateResponseDTO,
  FindRoleResponseDTO,
  FindRolesResponseDTO
} from './dto';
import { plainToInstance } from 'class-transformer';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '@/shared/guards/authentication-guard';
import { AuthorizationGuard } from '@/shared/guards/authorization-guard/authorization.guard';
import { Authorize } from '@/shared/decorator';
import { ClaimEnum } from '@/shared';

@ApiTags('Authorization')
@ApiBearerAuth()
@Controller('roles')
export class RoleController {
  constructor(private readonly roleService: RoleService) { }

  @UseGuards(JwtAuthGuard)
  @Get()
  async find(): Promise<FindRolesResponseDTO> {
    const roles = await this.roleService.find();
    return plainToInstance(FindRolesResponseDTO, { roles });
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(
    @Body() body: CreateRoleRequestDTO
  ): Promise<FindRoleResponseDTO> {
    const role = await this.roleService.create(body);
    return plainToInstance(FindRoleResponseDTO, role);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  async findOneAndUpdate(
    @Param('id') id: number,
    @Body() body: FindOneRoleAndUpdateRequestDTO
  ): Promise<FindOneRoleAndUpdateResponseDTO> {
    await this.roleService.findOneAndUpdate(id, body);
    return {};
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async findOneAndDelete(
    @Param('id') id: number
  ): Promise<FindOneRoleAndDeleteResponseDTO> {
    await this.roleService.findOneAndDelete(id);
    return {};
  }
}