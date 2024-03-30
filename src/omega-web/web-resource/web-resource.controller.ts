import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { WebResourceService } from './web-resource.service';
import { CreateWebResourceDto } from './dto/create-web-resource.dto';
import { UpdateWebResourceDto } from './dto/update-web-resource.dto';

@Controller('web-resource')
export class WebResourceController {
  constructor(private readonly webResourceService: WebResourceService) {}
}
