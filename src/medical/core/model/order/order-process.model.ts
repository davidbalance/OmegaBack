import { Model } from "@shared/shared/domain/model";

export type OrderProcessModelProps = {
    orderProcess: string;
}
export class OrderProcessModel extends Model<OrderProcessModelProps> {
    public get orderProcess(): Readonly<string> {
        return this.props.orderProcess;
    }
}