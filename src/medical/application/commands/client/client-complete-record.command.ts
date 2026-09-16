import { CommandHandlerAsync } from "@shared/shared/application";
import { ClientRepository } from "../../repository/aggregate.repositories";
import { ClientNotFoundError } from "@omega/medical/core/domain/client/errors/client.errors";
import { FileOperation, IncrementProvider } from "@shared/shared/providers";
import { PdfProvider } from "@shared/shared/providers/pdf.provider";
import { RecordInvalidRecordTemplate, RecordNotFoundError } from "@omega/medical/core/domain/client/errors/record.errors";

export const RECORD_ROOT_PATH: string = "medical_record"
export const RECORD_FILE_COUNT_KEY: string = "file-medical-record"
export type ClientRecordFilenameFunc = (name: string) => string;
export type ClientMetadataMapperFunc = (name: string, metadata: any | null | undefined) => object;
export type RecordTemplateFilepath = Record<string, Buffer>;
export type ClientCompleteRecordCommandPayload = {
    patientDni: string;
    recordId: string;
    type: string;
    metadata: any;
};
export interface ClientCompleteRecordCommand extends CommandHandlerAsync<ClientCompleteRecordCommandPayload, void> { }

export class ClientCompleteRecordCommandImpl implements ClientCompleteRecordCommand {
    constructor(
        private readonly template: RecordTemplateFilepath,
        private readonly pdf: PdfProvider,
        private readonly file: FileOperation,
        private readonly increment: IncrementProvider,
        private readonly filenameHelper: ClientRecordFilenameFunc,
        private readonly repository: ClientRepository,
        private readonly metadataHelper: ClientMetadataMapperFunc
    ) { }

    async handleAsync(value: ClientCompleteRecordCommandPayload): Promise<void> {
        const client = await this.repository.findOneAsync({ filter: [{ field: 'patientDni', operator: 'eq', value: value.patientDni }] });
        if (!client) throw new ClientNotFoundError(value.patientDni);

        if (!(value.type in this.template)) throw new RecordInvalidRecordTemplate(value.type);

        client.updateRecordMetadata({ recordId: value.recordId, metadata: value.metadata });

        const record = client.records.find(e => e.id === value.recordId);
        if (!record) throw new RecordNotFoundError(value.recordId);

        const recordNumber = await this.increment.next(value.type);
        const fileNumber = await this.increment.next(RECORD_FILE_COUNT_KEY);
        const template = this.template[value.type];

        const metadata = {
            ...value.metadata,
            establishment: {
                ...(value.metadata.establishment ? value.metadata.establishment : {}),
                clinicalHistoryNumber: recordNumber,
                fileNumber: fileNumber,
            }
        }

        const data: object = this.metadataHelper(record.name, metadata);
        const buffer = await this.pdf.craft(data, template.toString());
        const filepath = `${RECORD_ROOT_PATH}/${client.patientDni}_${`${client.patientName} ${client.patientLastname}`.toLowerCase().replaceAll(' ', '_')}`;
        const filename = this.filenameHelper(value.type);
        const path = await this.file.write(filepath, filename, buffer);

        client.completeRecord({ recordId: value.recordId, filepath: path });

        await this.repository.saveAsync(client);
    }
}