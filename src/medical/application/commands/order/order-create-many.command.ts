import { CommandHandlerAsync } from "@shared/shared/application";
import { ClientRepository } from "../../repository/model.repositories";
import { OrderRepository, TestRepository } from "../../repository/aggregate.repositories";
import { OrderCreateCommandPayload } from "./order-create.command";
import { TestCreateCommandPayload } from "../test/test-create.command";
import { Order } from "@omega/medical/core/domain/order/order.domain";
import { Test } from "@omega/medical/core/domain/test/test.domain";

export type OrderCreateManyCommandPayload = {
    data: (OrderCreateCommandPayload & { tests: Omit<TestCreateCommandPayload, 'orderId'>[] })[]
}
export class OrderCreateManyCommand implements CommandHandlerAsync<OrderCreateManyCommandPayload, void> {

    constructor(
        private readonly order: OrderRepository,
        private readonly test: TestRepository,
        private readonly client: ClientRepository
    ) { }

    async handleAsync(value: OrderCreateManyCommandPayload): Promise<void> {
        const patientCache = new Map<string, string>();
        const take: number = 10;
        const orders: Order[] = [];
        const tests: Test[] = [];

        for (const data of value.data) {
            const { tests: testPayloads, ...orderPayload } = data;

            let patientId = patientCache.get(orderPayload.patientDni);

            if (!patientId) {
                const patient = await this.client.findOneAsync([{ field: 'patientDni', operator: 'eq', value: orderPayload.patientDni }]);
                if (!patient) continue;

                patientId = patient.patientId;
                patientCache.set(orderPayload.patientDni, patientId);
            }
            const tmpOrder = Order.create({
                branchName: orderPayload.branchName,
                companyName: orderPayload.companyName,
                companyRuc: orderPayload.companyRuc,
                corporativeName: orderPayload.corporativeName,
                doctorDni: orderPayload.doctorDni,
                doctorFullname: orderPayload.doctorFullname,
                process: orderPayload.process,
                year: orderPayload.year,
                patientId: patientId
            });
            const tmpTests = testPayloads.map((testPayload) => Test.create({ ...testPayload, orderId: tmpOrder.id }));

            orders.push(tmpOrder);
            tests.push(...tmpTests);
        }

        for (let i = 0; i < orders.length; i += take) {
            await Promise.all(
                orders.slice(i, i + take).map(async (e) => {
                    try {
                        await this.order.saveAsync(e);
                    } catch (error) {
                        console.error(`Error saving order: ${error instanceof Error ? error.message : error}`);
                    }
                })
            );
        }

        for (let i = 0; i < tests.length; i += take) {

            await Promise.all(
                tests.slice(i, i + take).map(async (e) => {
                    try {
                        await this.test.saveAsync(e);
                    } catch (error) {
                        console.error(`Error saving test: ${error instanceof Error ? error.message : error}`);
                    }
                }));
        } 
    }
}