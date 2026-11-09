import { Module } from "@nestjs/common";
import { RecordFilenameHelperToken, RecordMetadataMapperHelperToken, RecordTemplateToken } from "@omega/medical/nest/inject/function.inject";
import { FileToken, FileType, FSModule, PathModule, PathToken, PathType } from "@shared/shared/common";
import { reportFilenameHelper } from "./record-filename.helper";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { ZodValidatorFactory } from "@shared/shared/nest/factories";
import recordTemplateConfigSchema from "./config/record-template.schema";
import recordTemplateConfig, { RecordTemplateName } from "./config/record-template.config";
import { ClientMetadataMapperFunc, RecordTemplateFilepath } from "@omega/medical/application/commands/client/client-complete-record.command";
import { mapMetadataToCertificate, mapMetadataToFemo } from "./record-metadata.helper";

@Module({
    imports: [
        ConfigModule.forRoot({
            cache: true,
            validate: ZodValidatorFactory(recordTemplateConfigSchema),
            load: [recordTemplateConfig]
        }),
        FSModule,
        PathModule
    ],
    providers: [
        {
            provide: RecordTemplateToken,
            useFactory: (config: ConfigService, pathService: PathType, fileService: FileType): RecordTemplateFilepath => {
                const directories = config.getOrThrow<Record<string, string>>(RecordTemplateName);
                return Object.entries(directories).reduce((acc, [key, path]) => {
                    const fullPath = pathService.resolve(path);
                    const buffer = fileService.readFileSync(fullPath);
                    return {
                        ...acc,
                        [key]: buffer
                    }
                }, {})
            },
            inject: [ConfigService, PathToken, FileToken]
        },
        {
            provide: RecordMetadataMapperHelperToken,
            useFactory: (argPath: PathType, argFile: FileType): ClientMetadataMapperFunc => {
                const imagePath = argPath.resolve('static/images/omega-variant.png');
                const imgBuffer = argFile.readFileSync(imagePath);
                const base64Header = `data:image/png;base64,${imgBuffer.toString('base64')}`

                const mapper = {
                    "femo": mapMetadataToFemo,
                    "certificado": mapMetadataToCertificate
                }
                return (name, metadata) => {
                    if (!(name in mapper)) return metadata;
                    if (metadata.logo && metadata.logo === "omega") {
                        metadata.base64Logo = base64Header;
                    }
                    return mapper[name](metadata)
                }
            },
            inject: [PathToken, FileToken]
        },
        {
            provide: RecordFilenameHelperToken,
            useValue: reportFilenameHelper
        }
    ],
    exports: [
        RecordTemplateToken,
        RecordFilenameHelperToken,
        RecordMetadataMapperHelperToken

    ]
})
export class ClientHelperModule { }