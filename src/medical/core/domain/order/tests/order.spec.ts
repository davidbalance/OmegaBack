import { Order } from "../order.domain";
import { CreateOrderPayload } from "../payloads/order.payloads";

describe('Order Aggregate', () => {

    let order: Order;
    let payload: CreateOrderPayload;

    beforeEach(() => {
        payload = {
            patientId: 'John Doe',
            doctorDni: '12345',
            doctorFullname: 'Dr. Smith',
            corporativeName: 'Omega',
            companyName: 'Omega',
            companyRuc: '0000000000',
            branchName: 'Quito',
            process: 'Test Process',
            year: 2025
        };

        order = Order.create(payload);
    })

    it('should create an Order aggregate correctly', () => {

        expect(order.patientId).toEqual('John Doe');
        expect(order.doctor.dni).toEqual('12345');
        expect(order.doctor.fullname).toEqual('Dr. Smith');
        expect(order.doctor.signature).toEqual(`signature/${payload.doctorDni}/${payload.doctorDni}.png`);
        expect(order.location.corporativeName).toEqual('Omega');
        expect(order.location.companyName).toEqual('Omega');
        expect(order.location.companyRuc).toEqual('0000000000');
        expect(order.location.branchName).toEqual('Quito');
        expect(order.status).toEqual("created");
        expect(order.email).toBeFalsy();
    });

    it('should change status to open', () => {
        order.changeStatusCreated();
        expect(order.status).toEqual("created");
    });

    it('should change status to closed', () => {
        order.changeStatusValidated();
        expect(order.status).toEqual("validated");
    });

    it('should change the mail property', () => {
        order.sendMail();
        expect(order.email).toBeTruthy();
    });
});
