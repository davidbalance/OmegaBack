import { Inject, Injectable, Provider } from "@nestjs/common";
import { ClientRepository } from "@omega/medical/application/repository/aggregate.repositories";
import { InjectAggregateRepository } from "../../inject/aggregate-repository.inject";
import { ClientCompleteRecordCommandToken } from "../../inject/command.inject";
import { ClientCompleteRecordCommandImpl, ClientMetadataMapperFunc, ClientRecordFilenameFunc, RecordTemplateFilepath } from "@omega/medical/application/commands/client/client-complete-record.command";
import { RecordFilenameHelperToken, RecordMetadataMapperHelperToken, RecordTemplateToken } from "../../inject/function.inject";
import { InjectFile, InjectIncrement, InjectPdf } from "@shared/shared/nest/inject";
import { PdfProvider } from "@shared/shared/providers/pdf.provider";
import { FileOperation, IncrementProvider } from "@shared/shared/providers";


@Injectable()
class ClientCompleteRecordNestCommand extends ClientCompleteRecordCommandImpl {
    constructor(
        @Inject(RecordTemplateToken) template: RecordTemplateFilepath,
        @InjectPdf() pdf: PdfProvider,
        @InjectFile() file: FileOperation,
        @Inject(RecordFilenameHelperToken) filenameHelper: ClientRecordFilenameFunc,
        @InjectIncrement() increment: IncrementProvider,
        @InjectAggregateRepository("Client") repository: ClientRepository,
        @Inject(RecordMetadataMapperHelperToken) metadataHelper: ClientMetadataMapperFunc
    ) {
        super(template, pdf, file, increment, filenameHelper, repository, metadataHelper);
    }
}

export const ClientCompleteRecordCommandProvider: Provider = {
    provide: ClientCompleteRecordCommandToken,
    useClass: ClientCompleteRecordNestCommand
}