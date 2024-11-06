import { Body, Controller, Delete, Inject, Logger, Param, Post, Res, StreamableFile, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { FileDownloaderService } from '../services/file-downloader.service';
import { PostFileSourceRequestDto } from '../dtos/request/file-source.post.dto';
import { PostDownloadZipRequestDto } from '../dtos/request/download-zip.post.dto';
import { JwtAuthGuard } from '@/shared/guards/authentication-guard/guards/jwt-auth.guard';
import { User } from '@/shared/decorator';

@ApiTags('Medical>File', 'External Connection')
@Controller('medical/file')
export class FileDownloaderController {
    constructor(
        @Inject(FileDownloaderService) private readonly service: FileDownloaderService,
    ) { }

    @Post()
    async getFile(
        @Body() body: PostFileSourceRequestDto,
        @Res({ passthrough: true }) response: Response
    ): Promise<StreamableFile> {
        const file = await this.service.downloadFile(body);
        response.set({
            'Content-Type': 'application/pdf',
            'Content-Disposition': 'attachment; filename="archivo-medico.pdf"',
        });
        return new StreamableFile(file);
    }

    @Post('multiple')
    async getZip(
        @Body() body: PostDownloadZipRequestDto,
        @Res({ passthrough: true }) response: Response
    ): Promise<StreamableFile> {
        const zip = await this.service.downloadMultipleFiles(body);
        response.set({
            'Content-Type': 'application/zip',
            'Content-Disposition': 'attachment; filename="archivo-medico.zip"',
        })
        return zip;
    }

    @UseGuards(JwtAuthGuard)
    @Delete(':type/:id')
    async deleteFile(
        @User() user: number,
        @Param('type') type: string,
        @Param('id') id: number,
    ): Promise<any> {
        await this.service.deleteFile({ id, type: type as any });
        Logger.warn(`File (${id} - ${type}) deleted by: ${user}`);
        return {};
    }
}
