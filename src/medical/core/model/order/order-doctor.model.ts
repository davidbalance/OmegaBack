import { OrderModel, OrderModelProps } from "./order.model";

export type OrderDoctorModelProps = {
    doctorDni: string;
    orderLeftReport: number;
}
export class OrderDoctorModel extends OrderModel {

    private readonly doctorProps: OrderDoctorModelProps;

    public get doctorDni(): Readonly<string> {
        return this.doctorProps.doctorDni;
    }

    public get orderLeftReport(): Readonly<number> {
        return this.doctorProps.orderLeftReport;
    }
    
    constructor(props: OrderModelProps & OrderDoctorModelProps) {
        super(props);
        this.doctorProps = props;
    }
}