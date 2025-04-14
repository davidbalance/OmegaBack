import { Model } from "@shared/shared/domain/model";

export type OrderCloudFileModelProps = {
    testId: string;
    patientDni: string;
    patientFullname: string;
    orderId: string;
    examName: string;
    resultHasFile: boolean;
    reportHasContent: boolean;
}
export class OrderCloudFileModel extends Model<OrderCloudFileModelProps> {
    public get orderId(): Readonly<string> {
        return this.props.orderId;
    }

    public get patientDni(): Readonly<string> {
        return this.props.patientDni;
    }

    public get patientFullname(): Readonly<string> {
        return this.props.patientFullname;
    }

    public get testId(): Readonly<string> {
        return this.props.testId;
    }

    public get examName(): Readonly<string> {
        return this.props.examName;
    }

    public get resultHasFile(): Readonly<boolean> {
        return this.props.resultHasFile;
    }

    public get reportHasContent(): Readonly<boolean> {
        return this.props.reportHasContent;
    }
}