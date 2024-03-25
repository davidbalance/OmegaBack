import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ProcessService } from './process.service';
import { CreateProcessRequestDTO, CreateProcessResponseDTO, FindProcessResponseDTO } from './dto';

@Controller('process')
export class ProcessController {
  constructor(private readonly processService: ProcessService) { }

  @Post()
  async create(@Body() createProcess: CreateProcessRequestDTO): Promise<CreateProcessResponseDTO> {
    await this.processService.create(createProcess)
    return;
  }

  @Get()
  async findProcesses(): Promise<FindProcessResponseDTO> {
    return this.processService.find();
  }
}
