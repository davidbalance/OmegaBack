import { CommandHandlerAsync } from "@shared/shared/application";
import { ClientRepository } from "../../repository/model.repositories";
import { OrderRepository, TestRepository } from "../../repository/aggregate.repositories";
import { OrderCreateCommandPayload } from "./order-create.command";
import { TestCreateCommandPayload } from "../test/test-create.command";
import { Order } from "@omega/medical/core/domain/order/order.domain";
import { Test } from "@omega/medical/core/domain/test/test.domain";

type OrderManyPayload = {
    [key: string]: OrderCreateCommandPayload & {
        tests: Omit<TestCreateCommandPayload, 'orderId'>[]
    }
}
export type OrderCreateManyCommandPayload = {
    data: (OrderCreateCommandPayload & Omit<TestCreateCommandPayload, 'orderId'>)[]
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

        const data = value.data.reduce<OrderManyPayload>((prev, curr) => {
            const key = `${curr.patientDni}-${curr.process}`;
            if (!prev[key]) prev[key] = {
                branchName: curr.branchName,
                companyName: curr.companyName,
                companyRuc: curr.companyRuc,
                corporativeName: curr.corporativeName,
                doctorDni: curr.doctorDni,
                doctorFullname: curr.doctorFullname,
                patientDni: curr.patientDni,
                process: curr.process,
                year: curr.year,
                tests: []
            };
            prev[key].tests.push({
                examName: curr.examName,
                examSubtype: curr.examSubtype,
                examType: curr.examType,
            });
            return prev;
        }, {});

        const keys = Object.keys(data);

        for (const key of keys) {
            const { tests: testPayloads, ...orderPayload } = data[key];

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