import { Model } from "@shared/shared/domain/model";
import { OrderStatus } from "../../domain/order/order.domain";

export type OrderModelProps = {
    orderId: string;
    orderMail: boolean;
    orderProcess: string;
    orderEmissionDate: Date;
    orderStatus: OrderStatus;
    patientDni: string;
}
export class OrderModel extends Model<OrderModelProps> {
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

    public get patientDni(): Readonly<string> {
        return this.props.patientDni;
    }
}