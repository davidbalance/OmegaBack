import { Model } from "@shared/shared/domain/model";
import { OrderStatus } from "../../domain/order/order.domain";

export type OrderPatientModelProps = {
    orderId: string;
    orderMail: boolean;
    orderProcess: string;
    orderEmissionDate: Date;
    orderStatus: OrderStatus;
    patientName: string;
    patientLastname: string;
    patientDni: string;
    locationCorporative: string;
    locationCompanyRuc: string;
    locationCompanyName: string;
    locationBranchName: string;
}
export class OrderPatientModel extends Model<OrderPatientModelProps> {
    public get orderId(): Readonly<string> {
        return this.props.orderId;
    }

    public get orderMail(): Readonly<boolean> {
        return this.props.orderMail;
    }

    public get orderProcess(): Readonly<string> {
        return this.props.orderProcess;
    }

    public get orderEmissionDate(): Readonly<Date> {
        return this.props.orderEmissionDate;
    }

    public get orderStatus(): Readonly<OrderStatus> {
        return this.props.orderStatus;
    }

    public get patientName(): Readonly<string> {
        return this.props.patientName;
    }

    public get patientLastname(): Readonly<string> {
        return this.props.patientLastname;
    }

    public get patientDni(): Readonly<string> {
        return this.props.patientDni;
    }

    public get locationCorporative(): Readonly<string> {
        return this.props.locationCorporative;
    }

    public get locationCompanyRuc(): Readonly<string> {
        return this.props.locationCompanyRuc;
    }

    public get locationCompanyName(): Readonly<string> {
        return this.props.locationCompanyName;
    }

    public get locationBranchName(): Readonly<string> {
        return this.props.locationBranchName;
    }
}