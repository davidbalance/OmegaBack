import { Client, ClientProps } from "@omega/medical/core/domain/client/client.domain";
import { Order, OrderProps } from "@omega/medical/core/domain/order/order.domain";
import { Test, TestProps } from "@omega/medical/core/domain/test/test.domain";
import { AggregateRepository, BatchAggregateRepository } from "@shared/shared/providers";

export type ClientRepository = AggregateRepository<ClientProps, Client>;
export type OrderRepository = AggregateRepository<OrderProps, Order>;
export type TestRepository = AggregateRepository<TestProps, Test> & BatchAggregateRepository<TestProps, Test>;