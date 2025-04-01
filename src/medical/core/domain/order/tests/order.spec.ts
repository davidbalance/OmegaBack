import { OrderExternalKeyConflictError } from "../errors/order-external-key.errors";
import { OrderExternalKey } from "../value_objects/order-external-key.value-object";
import { Order } from "../order.domain";
import { AddOrderExternalKeyPayload, CreateOrderPayload } from "../payloads/order.payloads";

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
        expect(order.externalKeys).toHaveLength(0);
    });

    it('should rehydrate', () => {
        const orderId = crypto.randomUUID();
        const rehydrated = Order.rehydrate({
            id: orderId,
            patientId: 'John Doe',
            doctorDni: '12345',
            doctorFullname: 'Dr. Smith',
            locationCorporativeName: 'Omega',
            locationCompanyName: 'Omega',
            locationCompanyRuc: '0000000000',
            locationBranchName: 'Quito',
            process: 'Test Process',
            year: 2025,
            doctorSignature: "/path/to/signature.png",
            email: true,
            status: 'created',
            externalKeys: [OrderExternalKey.create({ owner: 'app', orderId: orderId, value: 'key' })]
        });

        expect(rehydrated.patientId).toEqual('John Doe');
        expect(rehydrated.doctor.dni).toEqual('12345');
        expect(rehydrated.doctor.fullname).toEqual('Dr. Smith');
        expect(rehydrated.doctor.signature).toEqual("/path/to/signature.png");
        expect(rehydrated.location.corporativeName).toEqual('Omega');
        expect(rehydrated.location.companyName).toEqual('Omega');
        expect(rehydrated.location.companyRuc).toEqual('0000000000');
        expect(rehydrated.location.branchName).toEqual('Quito');
        expect(rehydrated.status).toEqual("created");
        expect(rehydrated.email).toBeTruthy();
        expect(rehydrated.externalKeys).toHaveLength(1);
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

    it('should add an external key property', () => {
        const payload: AddOrderExternalKeyPayload = { owner: 'omega', value: 'sample-key' }

        order.addKey(payload);

        expect(order.externalKeys).toHaveLength(1);
        expect(order.externalKeys[0].owner).toBe(payload.owner);
        expect(order.externalKeys[0].value).toBe(payload.value);
    });

    it('should throw a conflict error when add a repeated key', () => {
        const payload: AddOrderExternalKeyPayload = { owner: 'omega', value: 'sample-key' }
        order.addKey(payload);

        expect(() => order.addKey(payload)).toThrow(OrderExternalKeyConflictError);
    });
});
