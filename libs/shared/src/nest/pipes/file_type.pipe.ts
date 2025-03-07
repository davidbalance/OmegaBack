import { FileValidator, Injectable } from "@nestjs/common";

type MIME_TYPE = 'image/jpeg' | 'image/png' | 'image/gif';

type IFileTypeOptions = {
    acceptableTypes: MIME_TYPE | MIME_TYPE[]
}

@Injectable()
export class FileTypePipe extends FileValidator<IFileTypeOptions> {

    protected readonly validationOption: IFileTypeOptions = {
        acceptableTypes: ['image/gif', 'image/jpeg', 'image/png']
    }

    isValid(file?: Express.Multer.File): boolean {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
        const actualMimeType = file?.mimetype;
        return this.validationOptions.acceptableTypes.includes(actualMimeType as unknown as MIME_TYPE);
    }

    buildErrorMessage(file: Express.Multer.File): string {
        let options = this.validationOption.acceptableTypes;
        if (!Array.isArray(options)) {
            options = [options];
        }
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        return `Actual file=${file.originalname} has unacceptable MIME type. List of acceptable types: ${options.join(', ')}`
    }
}