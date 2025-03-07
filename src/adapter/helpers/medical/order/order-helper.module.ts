import { Module } from "@nestjs/common";
import { ChecklistLayoutToken, EmailAttachmentToken, RedirectEmailUrlToken } from "@omega/medical/nest/inject/function.inject";
import { EmailAttachment } from "@shared/shared/providers/email.provider";
import { checklistLayoutLoader } from "./checklist-layout-loader.factory";
import { OrderChecklistModel } from "@omega/medical/core/model/order/order-checklist.model";
import { OrderChecklistLayoutFunc } from "@omega/medical/application/queries/order/order-checklist-get-file.query";
import { FileToken, FileType, FSModule, PathModule, PathToken, PathType } from "@shared/shared/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import redirectUrlEmailConfig, { RedirectUrlEmail, RedirectUrlEmailName } from "./config/redirect-url-email.config";
import redirectUrlEmailConfigSchema from "./config/redirect-url-email.schema";
import { ZodValidatorFactory } from "@shared/shared/nest/factories";

@Module({
    imports: [
        ConfigModule.forRoot({
            cache: true,
            validate: ZodValidatorFactory(redirectUrlEmailConfigSchema),
            load: [redirectUrlEmailConfig]
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
            provide: ChecklistLayoutToken,
            useFactory: (fileService: FileType, pathService: PathType): OrderChecklistLayoutFunc => {
                const imagePath = pathService.resolve('static/images/omega-variant.png');
                const imgBuffer = fileService.readFileSync(imagePath);
                const logo = `data:image/png;base64,${imgBuffer.toString('base64')}`
                return (value: OrderChecklistModel[]) => {
                    return checklistLayoutLoader(value, logo);
                }
            },
            inject: [FileToken, PathToken]
        },
        {
            provide: RedirectEmailUrlToken,
            useFactory: (config: ConfigService) => {
                return config.getOrThrow<RedirectUrlEmail>(RedirectUrlEmailName).redirect_url;
            },
            inject: [ConfigService]
        }
    ],
    exports: [
        EmailAttachmentToken,
        ChecklistLayoutToken,
        RedirectEmailUrlToken
    ]
})
export class OrderHelperModule { }