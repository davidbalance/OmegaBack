import { Controller, Param, ParseFilePipe, Post, UploadedFile, UseGuards, UseInterceptors } from "@nestjs/common";
import { ApiBearerAuth, ApiConsumes, ApiTags } from "@nestjs/swagger";
import { InjectCommand } from "@omega/profile/nest/inject/command.inject";
import { AuthGuard } from "@shared/shared/nest/guard";
import { DoctorUploadFileCommand } from "@omega/profile/application/command/user/doctor-upload-file.command";
import { FileInterceptor } from '@nestjs/platform-express'
import { FileTypePipe } from "@shared/shared/nest/pipes/file-type.pipe";

@ApiTags('Profile', 'Write')
@ApiBearerAuth()
@UseGuards(AuthGuard)
@Controller('doctor/write')
export class DoctorWriteController {
    constructor(
        @InjectCommand('DoctorUploadFile') private readonly uploadCommand: DoctorUploadFileCommand,
    ) { }

    @ApiConsumes('multipart/form-data')
    @UseInterceptors(FileInterceptor('file'))
    @Post('signature/:userId')
    async create(
        @Param('userId') userId: string,
        @UploadedFile(new ParseFilePipe({
            validators: [new FileTypePipe({ acceptableTypes: 'image/png' })],
            fileIsRequired: true,
        })) file: Express.Multer.File
    ): Promise<string> {
        const { buffer } = file;
        await this.uploadCommand.handleAsync({ userId, buffer: buffer });
        return "ok";
    }
}