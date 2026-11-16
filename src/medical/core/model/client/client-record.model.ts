import { Model } from "@shared/shared/domain/model";

export type ClientRecordModelProps = {
    recordId: string;
    recordFilepath: string;
    recordMetadata?: object | null | undefined;
    recordName: string;
    recordEmissionDate: Date;
    patientDni: string;
    version: "v1" | "v2";
    status: string;
}
export class ClientRecordModel extends Model<ClientRecordModelProps> {
    public get recordId(): string {
        return this.props.recordId;
    }

    public get recordFilepath(): string {
        return this.props.recordFilepath;
    }

    public get recordMetadata(): object | null | undefined {
        return this.props.recordMetadata;
    }

    public get recordName(): string {
        return this.props.recordName;
    }

    public get recordEmissionDate(): Date {
        return this.props.recordEmissionDate;
    }

    public get patientDni(): string {
        return this.props.patientDni;
    }

    public get version(): string {
        return this.props.version;
    }

    public get status(): string {
        return this.props.status;
    }
}