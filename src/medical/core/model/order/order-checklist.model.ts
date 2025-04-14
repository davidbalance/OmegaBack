import { Model } from "@shared/shared/domain/model";

export type OrderChecklistModelProps = {
    testId: string;
    testCheck: boolean;
    examName: string;
    patientDni: string;
    patientName: string;
    patientLastname: string;
    orderId: string;
    orderProcess: string;
    orderEmissionDate: Date;
    locationCompanyRuc: string;
    locationCompanyName: string;
    locationJobPosition: string | null | undefined;
}
export class OrderChecklistModel extends Model<OrderChecklistModelProps> {
    public get patientDni(): Readonly<string> {
        return this.props.patientDni;
    }

    public get patientName(): Readonly<string> {
        return this.props.patientName;
    }

    public get patientLastname(): Readonly<string> {
        return this.props.patientLastname;
    }

    public get orderId(): Readonly<string> {
        return this.props.orderId;
    }

    public get orderProcess(): Readonly<string> {
        return this.props.orderProcess;
    }

    public get orderEmissionDate(): Readonly<Date> {
        return this.props.orderEmissionDate;
    }

    public get locationCompanyRuc(): Readonly<string> {
        return this.props.locationCompanyRuc;
    }

    public get locationCompanyName(): Readonly<string> {
        return this.props.locationCompanyName;
    }

    public get locationJobPosition(): Readonly<string> | null | undefined {
        return this.props.locationJobPosition;
    }

    public get testId(): Readonly<string> {
        return this.props.testId;
    }

    public get testCheck(): Readonly<boolean> {
        return this.props.testCheck;
    }

    public get examName(): Readonly<string> {
        return this.props.examName;
    }
}