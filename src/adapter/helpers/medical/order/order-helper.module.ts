import { Module } from "@nestjs/common";
import { EmailAttachment } from "@shared/shared/providers/email.provider";
import { FileToken, FileType, FSModule, PathModule, PathToken, PathType } from "@shared/shared/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import orderHelperConfig, { OrderHelper, OrderHelperName } from "./config/order-helper.config";
import orderHelperSchema from "./config/order-helper.schema";
import { ZodValidatorFactory } from "@shared/shared/nest/factories";
import { ChecklistDataParserToken, ChecklistTemplateToken, EmailAttachmentToken, RedirectEmailUrlToken } from "@omega/medical/nest/inject/function.inject";
import { OrderChecklistDataParseFunc } from "@omega/medical/application/queries/order/order-checklist-get-file.query";
import { checklistParser } from "./helper/checklist-parser.helper";

@Module({
    imports: [
        ConfigModule.forRoot({
            cache: true,
            validate: ZodValidatorFactory(orderHelperSchema),
            load: [orderHelperConfig]
        }),
        PathModule,
        FSModule
    ],
    providers: [
        {
            provide: EmailAttachmentToken,
            useFactory: (argPath: PathType): EmailAttachment[] => [{
                cid: 'logo',
                filename: 'omega.png',
                path: argPath.resolve('static/images/omega.png')
            }],
            inject: [PathToken]
        },
        {
            provide: ChecklistTemplateToken,
            useFactory: (config: ConfigService): string => {
                return config.getOrThrow<OrderHelper>(OrderHelperName).templatePath;
            },
            inject: [ConfigService]
        },
        {
            provide: ChecklistDataParserToken,
            useFactory: (config: ConfigService, pathService: PathType, fileService: FileType): OrderChecklistDataParseFunc => {

                const logoBasePath = config.getOrThrow<OrderHelper>(OrderHelperName).logoPath;

                const logoPath = pathService.resolve(logoBasePath);
                const logoBuffer = fileService.readFileSync(logoPath);
                const logoBase64 = `data:image/png;base64,${logoBuffer.toString('base64')}`

                return checklistParser(logoBase64)
            },
            inject: [ConfigService, PathToken, FileToken]
        },
        {
            provide: RedirectEmailUrlToken,
            useFactory: (config: ConfigService) => {
                return config.getOrThrow<OrderHelper>(OrderHelperName).redirectUrl;
            },
            inject: [ConfigService]
        }
    ],
    exports: [
        EmailAttachmentToken,
        ChecklistTemplateToken,
        ChecklistDataParserToken,
        RedirectEmailUrlToken
    ]
})
export class OrderHelperModule { }