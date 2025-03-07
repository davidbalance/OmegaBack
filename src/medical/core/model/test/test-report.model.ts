import { Model } from "@shared/shared/domain/model";

export type TestReportModelProps = {
    diseaseReportId: string;
    testId: string;
    orderYear: number;
    orderProcess: string;
    orderDate: Date;
    locationCorporative: string;
    locationCompany: string;
    locationBranch: string;
    locationManagement: string | null | undefined;
    locationArea: string | null | undefined;
    locationJobPosition: string | null | undefined;
    patientDni: string;
    patientName: string;
    patientLastname: string;
    patientEmail: string;
    patientBirthday: Date;
    patientAgeRange: string;
    patientAge: number;
    patientRole: string | null | undefined;
    patientGender: 'male' | 'female';
    examName: string;
    examSubtype: string;
    examType: string;
    diseaseName: string;
    diseaseGroup: string;
    diseaseCommentary: string;
    diseaseFindings: string;
}
export class TestReportModel extends Model<TestReportModelProps> {

    public get diseaseReportId(): Readonly<string> {
        return this.props.diseaseReportId;
    }

    public get testId(): Readonly<string> {
        return this.props.testId;
    }

    public get orderYear(): Readonly<number> {
        return this.props.orderYear;
    }

    public get orderProcess(): Readonly<string> {
        return this.props.orderProcess;
    }

    public get orderDate(): Readonly<Date> {
        return this.props.orderDate;
    }

    public get locationCorporative(): Readonly<string> {
        return this.props.locationCorporative;
    }

    public get locationCompany(): Readonly<string> {
        return this.props.locationCompany;
    }

    public get locationBranch(): Readonly<string> {
        return this.props.locationBranch;
    }

    public get locationManagement(): Readonly<string> | null | undefined {
        return this.props.locationManagement;
    }

    public get locationArea(): Readonly<string> | null | undefined {
        return this.props.locationArea;
    }

    public get locationJobPosition(): Readonly<string> | null | undefined {
        return this.props.locationJobPosition;
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

    public get patientEmail(): Readonly<string> {
        return this.props.patientEmail;
    }

    public get patientAgeRange(): Readonly<string> {
        return this.props.patientAgeRange;
    }

    public get patientAge(): Readonly<number> {
        return this.props.patientAge;
    }

    public get patientBirthday(): Readonly<Date> {
        return this.props.patientBirthday;
    }

    public get patientRole(): Readonly<string> | null | undefined {
        return this.props.patientRole;
    }

    public get patientGender(): Readonly<string> {
        return this.props.patientGender;
    }

    public get examName(): Readonly<string> {
        return this.props.examName;
    }

    public get examSubtype(): Readonly<string> {
        return this.props.examSubtype;
    }

    public get examType(): Readonly<string> {
        return this.props.examType;
    }

    public get diseaseName(): Readonly<string> {
        return this.props.diseaseName;
    }

    public get diseaseGroup(): Readonly<string> {
        return this.props.diseaseGroup;
    }

    public get diseaseCommentary(): Readonly<string> {
        return this.props.diseaseCommentary;
    }

    public get diseaseFindings(): Readonly<string> {
        return this.props.diseaseFindings;
    }
}