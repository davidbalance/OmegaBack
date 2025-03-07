import { Model } from "@shared/shared/domain/model";

type DoctorModelProps = {
    userId: string;
    userDni: string;
    userEmail: string;
    userName: string;
    userLastname: string;
    userHasAuth: boolean;
    doctorSignature: string;
    doctorHasFile: boolean;
}
export class DoctorModel extends Model<DoctorModelProps> {
    public get userId(): Readonly<string> {
        return this.props.userId;
    }

    public get userDni(): Readonly<string> {
        return this.props.userDni;
    }

    public get userEmail(): Readonly<string> {
        return this.props.userEmail;
    }

    public get userName(): Readonly<string> {
        return this.props.userName;
    }

    public get userLastname(): Readonly<string> {
        return this.props.userLastname;
    }

    public get userHasAuth(): Readonly<boolean> {
        return this.props.userHasAuth;
    }

    public get doctorSignature(): Readonly<string> {
        return this.props.doctorSignature;
    }

    public get doctorHasFile(): Readonly<boolean> {
        return this.props.doctorHasFile;
    }
}