import { Model } from "@shared/shared/domain/model";

export type ReportModelProps = {
    testId: string;
    reportContent: string | null | undefined;
    reportFilepath: string | null;
    reportEmissionDate: Date;
    patientFullname: string;
    patientAge: number;
    patientDni: string;
    locationCompanyName: string;
    examName: string;
    doctorDni: string;
    doctorFullname: string;
    doctorSignature: string;
}
export class ReportModel extends Model<ReportModelProps> {

    public get testId(): Readonly<string> {
        return this.props.testId;
    }

    public get reportContent(): Readonly<string> | null | undefined {
        return this.props.reportContent;
    }

    public get reportFilepath(): Readonly<string> | null {
        return this.props.reportFilepath;
    }

    public get patientFullname(): Readonly<string> {
        return this.props.patientFullname;
    }

    public get patientAge(): Readonly<number> {
        return this.props.patientAge;
    }

    public get patientDni(): Readonly<string> {
        return this.props.patientDni;
    }

    public get locationCompanyName(): Readonly<string> {
        return this.props.locationCompanyName;
    }

    public get examName(): Readonly<string> {
        return this.props.examName;
    }

    public get doctorFullname(): Readonly<string> {
        return this.props.doctorFullname;
    }

    public get doctorDni(): Readonly<string> {
        return this.props.doctorDni;
    }

    public get doctorSignature(): Readonly<string> {
        return this.props.doctorSignature;
    }

    public get reportEmissionDate(): Readonly<Date> {
        return this.props.reportEmissionDate;
    }
}