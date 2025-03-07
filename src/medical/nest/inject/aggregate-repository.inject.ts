import { Inject } from "@nestjs/common";

export const ClientAggregateRepositoryToken = 'Client';
export const OrderAggregateRepositoryToken = 'Order';
export const TestAggregateRepositoryToken = 'Test';

const repository = {
    Client: ClientAggregateRepositoryToken,
    Order: OrderAggregateRepositoryToken,
    Test: TestAggregateRepositoryToken,
}

export const InjectAggregateRepository = (token: keyof typeof repository) => Inject(repository[token]);