import { CommandHandlerAsync } from "@shared/shared/application";
import { ClientRepository } from "../../repository/aggregate.repositories";
import { ClientNotFoundError } from "@omega/medical/core/domain/client/errors/client.errors";
import { InitialRecord } from "../../type/initial-record";
import { PeriodicRecord } from "../../type/periodic-record";
import { ReintegrateRecord } from "../../type/reintegrate-record";
import { RetirementRecord } from "../../type/retirement-record";
import { CertificateRecord } from "../../type/certificate-record";
import { PdfProvider } from "@shared/shared/providers/pdf.provider";
import { FileOperation, IncrementProvider } from "@shared/shared/providers";

export type GenericRecord = InitialRecord | PeriodicRecord | ReintegrateRecord | RetirementRecord | CertificateRecord;
export type ClientRecordLayoutFunc = (value: GenericRecord, clinicNumber: number, fileNumber: number) => unknown;
export type ClientRecordFilenameFunc = (name: string) => string;
export type ClientAddRecordCommandPayload = GenericRecord & {
    patientDni: string;
}
export class ClientAddRecordCommand implements CommandHandlerAsync<ClientAddRecordCommandPayload, void> {
    constructor(
        private readonly repository: ClientRepository,
        private readonly pdf: PdfProvider,
        private readonly file: FileOperation,
        private readonly layoutHelper: ClientRecordLayoutFunc,
        private readonly filenameHelper: ClientRecordFilenameFunc,
        private readonly increment: IncrementProvider
    ) { }

    async handleAsync(value: ClientAddRecordCommandPayload): Promise<void> {
        const client = await this.repository.findOneAsync({ filter: [{ field: 'patientDni', operator: 'eq', value: value.patientDni }] });
        if (!client) throw new ClientNotFoundError(value.patientDni);

        const clinicNumber = await this.increment.next('clinic-history');
        const recordNumber = await this.increment.next(value.type);

        const buffer = await this.pdf.craft(this.layoutHelper(value, clinicNumber, recordNumber));
        const filepath = `medical_record/${client.patientDni}_${`${client.patientName} ${client.patientLastname}`.toLowerCase().replaceAll(' ', '_')}`;
        const filename = this.filenameHelper(value.type);
        const path = await this.file.write(filepath, filename, buffer);

        client.addRecord({ filepath: path, name: value.type });
        await this.repository.saveAsync(client);
    }
}