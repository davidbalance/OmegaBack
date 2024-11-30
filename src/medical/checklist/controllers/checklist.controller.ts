import { Body, Controller, Get, Inject, Param, Patch, Res, StreamableFile } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ChecklistService } from '../services/checklist.service';
import { PatchChecklistItemStaus } from '../dto/request/checklist-item-status.patch.dto';
import { GetChecklistDTO } from '../dto/response/checklist.get.dto';
import { plainToInstance } from 'class-transformer';
import { Response } from 'express';

@ApiTags('Medical>Checklist')
@ApiBearerAuth()
@Controller('checklist')
export class ChecklistController {

    constructor(
        @Inject(ChecklistService) private readonly service: ChecklistService
    ) { }

    @Get(':id')
    async findChecklist(
        @Param('id') id: number
    ): Promise<GetChecklistDTO> {
        const data = await this.service.findOne(id);
        return plainToInstance(GetChecklistDTO, data);
    }

    @Get('pdf/:id')
    async findChecklistPDF(
        @Param('id') id: number,
        @Res({ passthrough: true }) response: Response
    ): Promise<StreamableFile> {
        const buffer = await this.service.download(id);
        response.set({
            'Content-Type': 'application/pdf',
            'Content-Disposition': 'attachment; filename="checklist.pdf"',
        });
        return new StreamableFile(buffer);
    }

    @Patch(':id')
    async updateItemStatus(
        @Param('id') id: number,
        @Body() body: PatchChecklistItemStaus
    ): Promise<any> {
        await this.service.updateItemStatus(id, body.status);
        return "";
    }
}
