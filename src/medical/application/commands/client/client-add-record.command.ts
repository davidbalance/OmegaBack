import { CommandHandlerAsync } from "@shared/shared/application";
import { ClientRepository } from "../../repository/aggregate.repositories";
import { ClientNotFoundError } from "@omega/medical/core/domain/client/errors/client.errors";
import { InitialRecord } from "../../type/initial-record";
import { PeriodicRecord } from "../../type/periodic-record";
import { ReintegrateRecord } from "../../type/reintegrate-record";
import { RetirementRecord } from "../../type/retirement-record";
import { CertificateRecord } from "../../type/certificate-record";
import { PdfProvider } from "@shared/shared/providers/pdf.provider";
import { FileOperation } from "@shared/shared/providers";

export type ClientRecordLayoutFunc = (value: InitialRecord | PeriodicRecord | ReintegrateRecord | RetirementRecord | CertificateRecord) => unknown;
export type ClientRecordFilenameFunc = (name: string) => string;
export type ClientAddRecordCommandPayload = (InitialRecord | PeriodicRecord | ReintegrateRecord | RetirementRecord | CertificateRecord) & {
    patientDni: string;
}
export class ClientAddRecordCommand implements CommandHandlerAsync<ClientAddRecordCommandPayload, void> {
    constructor(
        private readonly repository: ClientRepository,
        private readonly pdf: PdfProvider,
        private readonly file: FileOperation,
        private readonly layoutHelper: ClientRecordLayoutFunc,
        private readonly filenameHelper: ClientRecordFilenameFunc,
    ) { }

    async handleAsync(value: ClientAddRecordCommandPayload): Promise<void> {
        const client = await this.repository.findOneAsync({ filter: [{ field: 'patientDni', operator: 'eq', value: value.patientDni }] });
        if (!client) throw new ClientNotFoundError(value.patientDni);

        const buffer = await this.pdf.craft(this.layoutHelper(value));
        const filepath = `medical_record/${client.patientDni}_${`${client.patientName} ${client.patientLastname}`.toLowerCase().replaceAll(' ', '_')}`;
        const filename = this.filenameHelper(value.type);
        const path = await this.file.write(filepath, filename, buffer);

        client.addRecord({ filepath: path, name: value.type });
        await this.repository.saveAsync(client);
    }
}