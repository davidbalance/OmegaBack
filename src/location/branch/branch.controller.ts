import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { BranchService } from './branch.service';
import { CreateBranchRequestDTO, UpdateBranchRequestDTO } from './dto';

@Controller('branch')
export class BranchController {
  constructor(private readonly branchService: BranchService) { }

  @Post()
  create(@Body() createBranchDto: CreateBranchRequestDTO) {
    return this.branchService.create(createBranchDto);
  }

  @Get()
  findAll() {
    return this.branchService.readAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.branchService.readOneByID(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBranchDto: UpdateBranchRequestDTO) {
    return this.branchService.update(+id, updateBranchDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.branchService.inactive(+id);
  }
}
