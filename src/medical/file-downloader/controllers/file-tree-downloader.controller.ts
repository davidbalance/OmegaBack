import { Controller, Get, Inject, Param, Query, Res, StreamableFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { JwtAuthGuard } from '@/shared/guards/authentication-guard/guards/jwt-auth.guard';
import { DownloadTreeRequest } from '../dtos/request/download-tree.dto';
import { FileTreeDownloaderService } from '../services/file-tree-downloader.service';
import { EmailInterceptor } from '@/shared/interceptors/dni/email.interceptor';
import { User } from '@/shared/decorator';

@ApiTags('Medical>File>Tree')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@UseInterceptors(EmailInterceptor)
@Controller('medical/file/tree')
export class FileTreeDownloaderController {
    constructor(
        @Inject(FileTreeDownloaderService) private readonly service: FileTreeDownloaderService,
    ) { }

    @Get()
    async startJob(
        @User() user: string,
        @Query() query: DownloadTreeRequest,
    ): Promise<any> {
        console.log("Starting job")
        await this.service.startTreeJob(user, query);
        console.log("Started job")
        return "";
    }

    @Get(':code')
    async downloadTree(
        @User() user: string,
        @Param('code') code: string,
        @Res({ passthrough: true }) response: Response
    ): Promise<any> {
        const zip = await this.service.downloadTree(user, code);
        response.set({
            'Content-Type': 'application/zip',
            'Content-Disposition': 'attachment; filename="file-tree.zip"',
        })
        return new StreamableFile(zip);
    }
}
