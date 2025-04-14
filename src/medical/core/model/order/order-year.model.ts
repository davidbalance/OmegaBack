import { Model } from "@shared/shared/domain/model";

export type OrderYearModelProps = {
    orderYear: number;
}
export class OrderYearModel extends Model<OrderYearModelProps> {
    public get orderYear(): Readonly<number> {
        return this.props.orderYear;
    }
}