import { Model } from "@shared/shared/domain/model";

export type OrderExternalConnectionModelProps = {
    orderId: string;
    orderExternalKey: string;
    orderExternalOwner: string;
    patientDni: string;
}
export class OrderExternalConnectionModel extends Model<OrderExternalConnectionModelProps> {
    public get orderId(): Readonly<string> {
        return this.props.orderId;
    }

    public get orderExternalKey(): Readonly<string> {
        return this.props.orderExternalKey;
    }

    public get orderExternalOwner(): Readonly<string> {
        return this.props.orderExternalOwner;
    }

    public get patientDni(): Readonly<string> {
        return this.props.patientDni;
    }
}