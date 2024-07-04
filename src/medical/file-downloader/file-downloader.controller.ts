import { Body, Controller, Delete, Inject, Param, Post, Res } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { FileDownloaderService } from './file-downloader.service';
import { DownloadAndZipContentRequestDto, FileSourceRequestDto } from './dto/file-downloader.request.dto';
import { Response } from 'express';

@ApiTags('Medical/File', 'External/Connection')
@Controller('medical/file')
export class FileDownloaderController {
    constructor(
        @Inject(FileDownloaderService) private readonly service: FileDownloaderService
    ) { }

    @Post()
    async getFile(
        @Body() body: FileSourceRequestDto,
        @Res() response: Response
    ) {
        const file = await this.service.downloadFile(body);
        response.set({
            'Content-Type': 'application/pdf',
            'Content-Disposition': 'attachment; filename="archivo-medico.pdf"',
        });
        file.getStream().pipe(response);
    }

    @Post('multiple')
    async getZip(
        @Body() body: DownloadAndZipContentRequestDto,
        @Res() response: Response
    ) {
        const zip = await this.service.downloadMultipleFiles(body);
        response.set({
            'Content-Type': 'application/zip',
            'Content-Disposition': 'attachment; filename="archivo-medico.zip"',
        })
        zip.getStream().pipe(response);
    }

    @Delete(':type/:id')
    async deleteFile(
        @Param('type') type: string,
        @Param('id') id: number,
    ) {
        await this.service.deleteFile({ id, type: type as any });
        return {};
    }
}
