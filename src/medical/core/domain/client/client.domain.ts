import { ManagementValueObject } from "./value_objects/management.value_object";
import { AreaValueObject } from "./value_objects/area.value_object";
import { Email } from "./email.domain";
import { AddAreaPayload, AddJobPositionPayload, AddManagementPayload, AddRecordPayload, CreateClientPayload, EditClientPayload } from "./payloads/client.payloads";
import { ClientAddedEmailEvent, ClientAreaAddedEvent, ClientDeletedEvent, ClientEditedEvent, ClientEmailRemovedEvent, ClientEmailSettedAsDefaultEvent, ClientJobPositionAddedEvent, ClientManagementAddedEvent, ClientRecordAddedEvent } from "./events/client.events";
import { AggregateProps, Aggregate } from "@shared/shared/domain";
import { EmailConflictError, EmailNotFoundError } from "./errors/email.errors";
import { Record } from "./record.domain";

export type ClientProps = AggregateProps & {
    patientDni: string;
    patientName: string;
    patientLastname: string;
    patientGender: 'male' | 'female';
    patientRole?: string | null;
    patientBirthday: Date;
    management?: ManagementValueObject | null;
    area?: AreaValueObject | null;
    jobPosition?: string | null;
    email: Email[];
    records: Record[];
};

type RehydrateClientProps = Omit<ClientProps, 'management' | 'area'> & {
    managementId: string | null;
    managementName: string | null;
    areaId: string | null;
    areaName: string | null;
}
export class Client extends Aggregate<ClientProps> {

    public get patientDni(): Readonly<string> {
        return this.props.patientDni;
    }

    public get patientName(): Readonly<string> {
        return this.props.patientName;
    }

    public get patientLastname(): Readonly<string> {
        return this.props.patientLastname;
    }

    public get patientGender(): Readonly<'male' | 'female'> {
        return this.props.patientGender;
    }

    public get patientRole(): Readonly<string> | null | undefined {
        return this.props.patientRole;
    }

    public get patientBirthday(): Readonly<Date> {
        return this.props.patientBirthday;
    }

    public get management(): Readonly<ManagementValueObject> | null | undefined {
        return this.props.management;
    }

    public get area(): Readonly<AreaValueObject> | null | undefined {
        return this.props.area;
    }

    public get jobPosition(): Readonly<string> | null | undefined {
        return this.props.jobPosition;
    }

    public get email(): ReadonlyArray<Email> {
        return this.props.email;
    }

    public get records(): ReadonlyArray<Record> {
        return this.props.records;
    }

    private ensureUniqueEmail(email: string): void {
        if (this.props.email.find(x => x.email === email)) throw new EmailConflictError(email);
    }

    public static create(value: CreateClientPayload): Client {
        return new Client({
            ...value,
            id: crypto.randomUUID(),
            management: null,
            area: null,
            jobPosition: null,
            email: [],
            records: []
        });
    }

    public static rehydrate(value: RehydrateClientProps): Client {
        let management: ManagementValueObject | null = null;
        let area: AreaValueObject | null = null;
        if (value.managementId && value.managementName) {
            management = ManagementValueObject.create({ id: value.managementId, name: value.managementName });
        }
        if (value.areaId && value.areaName) {
            area = AreaValueObject.create({ id: value.areaId, name: value.areaName });
        }
        const client = new Client({ ...value, management, area });
        client.commit();
        return client;
    }

    public edit(value: EditClientPayload): void {
        this.updateProps(value);
        this.emit(new ClientEditedEvent({
            ...value,
            patientDni: this.patientDni
        }));
    }

    public remove(): void {
        this.emit(new ClientDeletedEvent(this.patientDni));
    }

    public addEmail(email: string): void {
        this.ensureUniqueEmail(email);

        const newEmail = Email.create({
            clientId: this.id,
            email,
            default: !this.props.email.length
        });
        this.updateProps({ email: [...this.props.email, newEmail] });

        this.emit(new ClientAddedEmailEvent(newEmail));
    }

    public addDefaultEmail(emailId: string): void {
        if (!this.props.email.some(x => x.id === emailId)) throw new EmailNotFoundError(emailId);

        const newEmail = this.props.email.map(x => {
            x.removeDefault();
            if (x.id === emailId) {
                x.addDefault();
            }
            return x;
        })
        this.updateProps({ email: newEmail });

        this.emit(new ClientEmailSettedAsDefaultEvent({
            clientId: this.id,
            emailId
        }));
    }

    public removeEmail(emailId: string): void {
        const newEmail = this.props.email.filter(x => x.id !== emailId);
        if (newEmail.length === this.props.email.length) throw new EmailNotFoundError(emailId);

        this.updateProps({ email: newEmail });
        this.emit(new ClientEmailRemovedEvent(emailId));
    }

    public addManagement(value: AddManagementPayload): void {
        const management = ManagementValueObject.create({ id: value.managementId, name: value.managementName });
        this.updateProps({ management });
        this.emit(new ClientManagementAddedEvent({
            clientId: this.id,
            managementId: value.managementId,
            managementName: value.managementName
        }));
    }

    public addArea(value: AddAreaPayload): void {
        const area = AreaValueObject.create({
            id: value.areaId,
            name: value.areaName
        });
        this.updateProps({ area });
        this.emit(new ClientAreaAddedEvent({
            clientId: this.id,
            areaId: value.areaId,
            areaName: value.areaName
        }));
    }

    public addJobPosition(value: AddJobPositionPayload): void {
        this.updateProps({ jobPosition: value.jobPositionName });
        this.emit(new ClientJobPositionAddedEvent({
            clientId: this.id,
            jobPosition: value.jobPositionName
        }));
    }

    public addRecord(value: AddRecordPayload): void {
        const newRecord = Record.create({ ...value, clientId: this.id });
        this.updateProps({ records: [...this.props.records, newRecord] })
        this.emit(new ClientRecordAddedEvent(newRecord));
    }
}