import { Controller, Get } from '@nestjs/common';
import { PermissionService } from './permission.service';
import { FindPermissionResponseDTO } from './dto';

@Controller('permissions')
export class PermissionController {
  constructor(private readonly permissionService: PermissionService) { }

  @Get()
  async find(): Promise<FindPermissionResponseDTO> {
    const permissions = await this.permissionService.find();
    return { permissions };
  }

}
