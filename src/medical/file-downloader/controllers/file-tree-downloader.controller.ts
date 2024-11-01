import { Controller, Get, Inject, Query, Res, StreamableFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { JwtAuthGuard } from '@/shared/guards/authentication-guard/guards/jwt-auth.guard';
import { DownloadTreeRequest } from '../dtos/request/download-tree.dto';
import { FileTreeDownloaderService } from '../services/file-tree-downloader.service';

@ApiTags('Medical>File>Tree')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('medical/file/tree')
export class FileTreeDownloaderController {
    constructor(
        @Inject(FileTreeDownloaderService) private readonly service: FileTreeDownloaderService,
    ) { }

    @Get()
    async downloadTree(
        @Query() query: DownloadTreeRequest,
        @Res({ passthrough: true }) response: Response
    ): Promise<StreamableFile> {
        const zip = await this.service.downloadTree(query);
        response.set({
            'Content-Type': 'application/zip',
            'Content-Disposition': 'attachment; filename="file-tree.zip"',
        })
        return zip;
    }
}
