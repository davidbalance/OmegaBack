/* eslint-disable @typescript-eslint/unbound-method */
import { OrderRepository, TestRepository } from "@omega/medical/application/repository/aggregate.repositories";
import { ClientRepository } from "@omega/medical/application/repository/model.repositories";
import { OrderCreateBatch, OrderCreateManyCommand, OrderCreateManyCommandImpl } from "../order-create-many.command";
import { ClientModel } from "@omega/medical/core/model/client/client.model";
import { Order } from "@omega/medical/core/domain/order/order.domain";
import { Test } from "@omega/medical/core/domain/test/test.domain";

describe("OrderCreateManyCommand", () => {
    let order: jest.Mocked<OrderRepository>;
    let test: jest.Mocked<TestRepository>;
    let client: jest.Mocked<ClientRepository>;
    let handler: OrderCreateManyCommand;

    beforeEach(() => {
        order = {
            saveAsync: jest.fn(),
        } as unknown as jest.Mocked<OrderRepository>;

        test = {
            saveAsync: jest.fn(),
        } as unknown as jest.Mocked<TestRepository>;

        client = {
            findOneAsync: jest.fn(),
        } as unknown as jest.Mocked<ClientRepository>;

        handler = new OrderCreateManyCommandImpl(order, test, client);
    });

    const payload: OrderCreateBatch[] = [
        {
            patientDni: '12345', branchName: 'Clinic A', companyName: 'Health Co.', companyRuc: '123456789', corporativeName: 'Corp A', doctorDni: '54321', doctorFullname: 'Dr. Test', process: 'Checkup', year: 2025,
            tests: [{ examName: 'Blood Test', examSubtype: 'CBC', examType: 'Lab' }]
        },
        {
            patientDni: '12345', branchName: 'Clinic A', companyName: 'Health Co.', companyRuc: '123456789', corporativeName: 'Corp A', doctorDni: '54321', doctorFullname: 'Dr. Test', process: 'Checkup', year: 2025,
            tests: [{ examName: 'X-Ray', examSubtype: 'Chest X-Ray', examType: 'Radiology' }]
        }
    ];

    it('should fetch and cache patient data to avoid redundant requests', async () => {
        const mockPatient: ClientModel = { patientId: 'patient1', patientDni: '12345' } as unknown as ClientModel;

        client.findOneAsync.mockResolvedValue(mockPatient);

        await handler.handleAsync({ data: payload });

        expect(client.findOneAsync).toHaveBeenCalledTimes(1);
        expect(client.findOneAsync).toHaveBeenCalledWith(
            expect.arrayContaining([{ field: 'patientDni', operator: 'eq', value: '12345' }])
        );
    });

    it('should create orders and tests with the correct payload', async () => {
        const mockPatient: ClientModel = { patientId: 'patient1', patientDni: '12345' } as unknown as ClientModel;
        const mockOrder: Order = {
            id: 'orderId',
            branchName: 'Clinic A',
            companyName: 'Health Co.',
            companyRuc: '123456789',
            corporativeName: 'Corp A',
            doctorDni: '54321',
            doctorFullname: 'Dr. Test',
            process: 'Checkup',
            year: 2025,
            patientId: 'patient1',
        } as unknown as Order;
        const mockTest: Test = {
            examName: 'Blood Test',
            examSubtype: 'CBC',
            examType: 'Lab',
            orderId: mockOrder.id,
        } as unknown as Test;

        client.findOneAsync.mockResolvedValue(mockPatient);
        const spyOrder = jest.spyOn(Order, 'create').mockReturnValue(mockOrder);
        const spyTest = jest.spyOn(Test, 'create').mockReturnValue(mockTest);

        await handler.handleAsync({ data: payload.slice(1) });

        expect(spyOrder).toHaveBeenCalled();
        expect(spyTest).toHaveBeenCalled();
        expect(order.saveAsync).toHaveBeenCalledWith(mockOrder);
        expect(test.saveAsync).toHaveBeenCalledWith(mockTest);
    });
});
