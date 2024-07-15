import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { plainToInstance } from 'class-transformer';
import { JwtAuthGuard } from '@/shared/guards/authentication-guard';
import { User } from '@/shared/decorator';
import { PATCHUserExtraAttributeRequestDto, PATCHUserRequestDto, POSTUserRequestDto } from './dtos/user.request.dto';
import { POSTUserResponseDto, PATCHUserResponseDto, DELETEUserResponseDto, GETAttributeResponseDto, PATCHUserExtraAttributeResponseDto, GETUserArrayResponseDto, GETUserResponseDto } from './dtos/user.response.dto';

@ApiTags('User/User')
@ApiBearerAuth()
@Controller('users')
export class UserController {
  constructor(
    private readonly userService: UserService
  ) { }

  @UseGuards(JwtAuthGuard)
  @Get()
  async find(
    @User() user: number
  ): Promise<GETUserArrayResponseDto> {
    const users = await this.userService.find(user);
    return plainToInstance(GETUserArrayResponseDto, { users });
  }

  @UseGuards(JwtAuthGuard)
  @Get('user')
  async findOne(
    @User() user: number
  ): Promise<GETUserResponseDto> {
    const foundUser = await this.userService.findOne(user);
    return plainToInstance(GETUserResponseDto, foundUser);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(
    @Body() body: POSTUserRequestDto
  ): Promise<POSTUserResponseDto> {
    const user = await this.userService.create(body);
    return plainToInstance(POSTUserResponseDto, user);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  async findOneAndUpdate(
    @Param('id') id: number,
    @Body() body: PATCHUserRequestDto
  ): Promise<PATCHUserResponseDto> {
    const user = await this.userService.findOneAndUpdate(id, body)
    return plainToInstance(PATCHUserResponseDto, user);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async findOneAndInactive(
    @Param('id') id: number
  ): Promise<DELETEUserResponseDto> {
    await this.userService.findOneAndDelete(id);
    return {};
  }

  @UseGuards(JwtAuthGuard)
  @Get('look/for/company/:id')
  async findLookForCompanyAttribute(
    @Param('id') id: number,
  ): Promise<GETAttributeResponseDto> {
    const attribute = await this.userService.findExtraAttribute(id, 'look_for_company');
    return plainToInstance(GETAttributeResponseDto, attribute || {});
  }

  @UseGuards(JwtAuthGuard)
  @Patch('look/for/company/:id')
  async findOneAndUpdateLookForCompanyAttribute(
    @Param('id') id: number,
    @Body() body: PATCHUserExtraAttributeRequestDto
  ): Promise<PATCHUserExtraAttributeResponseDto> {
    await this.userService.assignExtraAttribute(id, { name: 'look_for_company', ...body });
    return {};
  }

  @UseGuards(JwtAuthGuard)
  @Get('employee/:id')
  async findEmployeeOfAttribute(
    @Param('id') id: number,
  ): Promise<GETAttributeResponseDto> {
    const attribute = await this.userService.findExtraAttribute(id, 'employee_of');
    return plainToInstance(GETAttributeResponseDto, attribute || {});
  }

  @UseGuards(JwtAuthGuard)
  @Patch('employee/:id')
  async findOneAndUpdateEmployeeOfAttribute(
    @Param('id') id: number,
    @Body() body: PATCHUserExtraAttributeRequestDto
  ): Promise<PATCHUserExtraAttributeResponseDto> {
    await this.userService.assignExtraAttribute(id, { name: 'employee_of', ...body });
    return {};
  }

  @UseGuards(JwtAuthGuard)
  @Get('doctor/of/:id')
  async findDoctorOfAttribute(
    @Param('id') id: number,
  ): Promise<GETAttributeResponseDto> {
    const attribute = await this.userService.findExtraAttribute(id, 'doctor_of');
    return plainToInstance(GETAttributeResponseDto, attribute || {});
  }

  @UseGuards(JwtAuthGuard)
  @Patch('doctor/of/:id')
  async findOneAndUpdateDoctorOfAttribute(
    @Param('id') id: number,
    @Body() body: PATCHUserExtraAttributeRequestDto
  ): Promise<PATCHUserExtraAttributeResponseDto> {
    await this.userService.assignExtraAttribute(id, { name: 'doctor_of', ...body });
    return {};
  }
}