import { Body, Controller, Header, Inject, Post, Res, StreamableFile } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { FileDownloaderService } from './file-downloader.service';
import { DownloadAndZipContentRequestDTO, FileSourceRequestDTO } from './dto/file-downloader.request.dto';
import { Response } from 'express';

@ApiTags('Medical Result')
@Controller('medical-result/file-downloader')
export class FileDownloaderController {
    constructor(
        @Inject(FileDownloaderService) private readonly service: FileDownloaderService
    ) { }

    @Post()
    getFile(
        @Body() body: FileSourceRequestDTO,
        @Res() response: Response
    ): Promise<StreamableFile> {
        response.set({
            'Content-Type': 'application/pdf',
            'Content-Disposition': 'attachment; filename="archivo-medico.pdf"',
        })
        return this.service.downloadFile(body);
    }

    @Post('multiple')
    getZip(
        @Body() body: DownloadAndZipContentRequestDTO,
        @Res() response: Response
    ): Promise<StreamableFile> {
        response.set({
            'Content-Type': 'application/zip',
            'Content-Disposition': 'attachment; filename="archivo-medico.zip"',
        })
        return this.service.downloadMultipleFiles(body);
    }
}
