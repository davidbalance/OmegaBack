import { Model } from "@shared/shared/domain/model";

export type ClientRecordModelProps = {
    recordId: string;
    recordFilepath: string;
    recordName: string;
    recordEmissionDate: Date;
    patientDni: string;
}
export class ClientRecordModel extends Model<ClientRecordModelProps> {
    public get recordId(): string {
        return this.props.recordId;
    }

    public get recordFilepath(): string {
        return this.props.recordFilepath;
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
}