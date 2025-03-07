import { Model } from "@shared/shared/domain/model";

export type ClientEmailModelProps = {
    emailId: string;
    emailValue: string;
    emailDefault: boolean;
    patientDni: string;
}
export class ClientEmailModel extends Model<ClientEmailModelProps> {
    public get emailId(): Readonly<string> {
        return this.props.emailId;
    }

    public get emailValue(): Readonly<string> {
        return this.props.emailValue;
    }

    public get emailDefault(): Readonly<boolean> {
        return this.props.emailDefault;
    }

    public get patientDni(): Readonly<string> {
        return this.props.patientDni;
    }
}