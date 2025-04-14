import { ExternalKey, ExternalKeyProps } from "@shared/shared/domain/external-key.value-object";
import { CreateOrderExternalKeyPayload } from "../payloads/order-external-key.payloads";

export type OrderExternalKeyProps = ExternalKeyProps & {
    orderId: string;
}

export class OrderExternalKey extends ExternalKey {
    private _orderId: string;

    public get orderId(): Readonly<string> {
        return this._orderId;
    }

    protected constructor(props: OrderExternalKeyProps) {
        super(props);
        this._orderId = props.orderId;
    }

    public static create(props: CreateOrderExternalKeyPayload): OrderExternalKey {
        return new OrderExternalKey({ ...props });
    }
}