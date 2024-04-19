import { FileValidator, Injectable } from "@nestjs/common";
import { IFileTypeOptions } from "./file-type-options.interface";
import { MIME_TYPES, MIME_TYPES_ARRAY } from "./constants";

@Injectable()
export class FileTypePipe extends FileValidator<IFileTypeOptions> {

    protected readonly validationOptions: { acceptableTypes: MIME_TYPES[] } = {
        acceptableTypes: [MIME_TYPES.JPG, MIME_TYPES.PNG, MIME_TYPES.GIF],
    };

    constructor(options: IFileTypeOptions) {
        super(options);

        if (!options ||
            (!Array.isArray(options.acceptableTypes) &&
                typeof options.acceptableTypes != 'string')) {
            throw new Error('Format of MIME types passed to File Type Validator is unreadable');
        }

        const acceptableTypes = Array.isArray(options.acceptableTypes)
            ? options.acceptableTypes
            : [options.acceptableTypes];

        for (const type of acceptableTypes) {
            if (!MIME_TYPES_ARRAY.includes(type)) {
                throw new Error('Unknown MIME type passed to File Type Validator');
            }
        }

        this.validationOptions.acceptableTypes = acceptableTypes;
    }

    isValid(file?: Express.Multer.File): boolean | Promise<boolean> {
        const actualMimeType = file.mimetype;
        return this.validationOptions.acceptableTypes.includes(actualMimeType as unknown as MIME_TYPES);
    }

    buildErrorMessage(file: any): string {
        return `Actual file '${file.originalname}' has unacceptable MIME type. List of acceptable types: ${this.validationOptions.acceptableTypes.join(', ')}.`;
    }
}