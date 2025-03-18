import { Inject, Injectable, Provider } from "@nestjs/common";
import { ClientRepository } from "@omega/medical/application/repository/aggregate.repositories";
import { InjectAggregateRepository } from "../../inject/aggregate-repository.inject";
import { ClientAddRecordCommandToken } from "../../inject/command.inject";
import { ClientAddRecordCommand, ClientRecordFilenameFunc, ClientRecordLayoutFunc } from "@omega/medical/application/commands/client/client-add-record.command";
import { InjectFile, InjectIncrement, InjectPdf } from "@shared/shared/nest/inject";
import { PdfProvider } from "@shared/shared/providers/pdf.provider";
import { FileOperation, IncrementProvider } from "@shared/shared/providers";
import { RecordFilenameHelperToken, RecordLayoutHelperToken } from "../../inject/function.inject";

@Injectable()
class ClientAddRecordNestCommand extends ClientAddRecordCommand {
    constructor(
        @InjectAggregateRepository("Client") repository: ClientRepository,
        @InjectPdf() pdf: PdfProvider,
        @InjectFile() file: FileOperation,
        @Inject(RecordLayoutHelperToken) layoutHelper: ClientRecordLayoutFunc,
        @Inject(RecordFilenameHelperToken) filenameHelper: ClientRecordFilenameFunc,
        @InjectIncrement() increment: IncrementProvider
    ) {
        super(repository, pdf, file, layoutHelper, filenameHelper, increment);
    }
}

export const ClientAddRecordCommandProvider: Provider = {
    provide: ClientAddRecordCommandToken,
    useClass: ClientAddRecordNestCommand
}