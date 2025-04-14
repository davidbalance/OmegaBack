import { Model } from "@shared/shared/domain/model";

export type ClientModelProps = {
    patientId: string;
    patientDni: string;
    patientName: string;
    patientLastname: string;
    patientBirthday: Date;
    patientGender: 'male' | 'female';
    patientRole: string | null | undefined;
    companyRuc: string;
}
export class ClientModel extends Model<ClientModelProps> {
    public get patientId(): Readonly<string> {
        return this.props.patientId;
    }

    public get patientDni(): Readonly<string> {
        return this.props.patientDni;
    }

    public get patientName(): Readonly<string> {
        return this.props.patientName;
    }

    public get patientLastname(): Readonly<string> {
        return this.props.patientLastname;
    }

    public get patientBirthday(): Readonly<Date> {
        return this.props.patientBirthday;
    }

    public get patientGender(): Readonly<'male' | 'female'> {
        return this.props.patientGender;
    }

    public get patientRole(): Readonly<string> | null | undefined {
        return this.props.patientRole;
    }

    public get companyRuc(): Readonly<string> {
        return this.props.companyRuc;
    }


}