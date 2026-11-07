import { OrderModel, OrderModelProps } from "./order.model";

export type OrderDoctorModelProps = {
    doctorDni: string;
}
export class OrderDoctorModel extends OrderModel {

    private readonly doctorProps: OrderDoctorModelProps;

    public get doctorDni(): Readonly<string> {
        return this.doctorProps.doctorDni;
    }
    
    constructor(props: OrderModelProps & OrderDoctorModelProps) {
        super(props);
        this.doctorProps = props;
    }
}