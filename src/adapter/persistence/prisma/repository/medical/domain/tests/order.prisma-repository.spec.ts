import { Logger } from "@nestjs/common";
import { Test, TestingModule } from "@nestjs/testing";
import { AggregateEvent, SearchCriteria } from "@shared/shared/domain";
import { PrismaService } from "@omega/adapter/persistence/prisma/prisma.service";
import { PrismaFilterMapper } from "@omega/adapter/persistence/prisma/filter-mapper";
import { RepositoryError } from "@shared/shared/domain/error";
import { Prisma } from "@prisma/client";
import { OrderPrismaRepository } from "../order.prisma-repository";
import { Order, OrderProps } from "@omega/medical/core/domain/order/order.domain";
import { OrderDomainMapper } from "@omega/adapter/persistence/prisma/mapper/medical/domain/order.domain-mapper";
import { OrderIsEvent, OrderMailSendedEventPayload, OrderProcessChangedEventPayload, OrderStatusChangedToCreatedEventPayload, OrderStatusChangedToValidatedEventPayload } from "@omega/medical/core/domain/order/events/order.events";
import { OrderRemoveCommandPayload } from "@omega/medical/application/commands/order/order-remove.command";
import { OrderExternalKey } from "@omega/medical/core/domain/order/value-objects/order-external-key.value-object";

describe("OrderPrismaRepository", () => {
    let repository: OrderPrismaRepository;
    let prisma;

    beforeEach(async () => {
        jest.spyOn(Logger, 'error').mockImplementation(() => { });
        prisma = {
            medicalOrder: {
                findFirst: jest.fn(),
                create: jest.fn(),
                update: jest.fn(),
            },
            medicalOrderExternalKey: {
                create: jest.fn(),
            },
        };

        const module: TestingModule = await Test.createTestingModule({
            providers: [
                OrderPrismaRepository,
                { provide: PrismaService, useValue: prisma }
            ]
        }).compile();

        repository = module.get<OrderPrismaRepository>(OrderPrismaRepository);
    });

    afterAll(() => {
        jest.clearAllMocks();
    })

    describe('findOneAsync', () => {
        const mockFilter: SearchCriteria<OrderProps> = { filter: [{ field: "id", operator: "eq", value: "test-id-123" }] };
        const mockPrismaWhere = { email: "test@mail.com" };

        beforeEach(() => {
            jest.spyOn(PrismaFilterMapper, "map").mockReturnValue(mockPrismaWhere);
        });

        it("should return domain object when match is found", async () => {
            const prismaResult = { id: "medicalOrder-1" };
            const domainResult = { id: "medicalOrder-1" };

            prisma.medicalOrder.findFirst.mockResolvedValue(prismaResult);
            jest.spyOn(OrderDomainMapper, "toDomain").mockReturnValue(domainResult as any);

            const result = await repository.findOneAsync(mockFilter);

            expect(PrismaFilterMapper.map).toHaveBeenCalledWith(mockFilter.filter);
            expect(prisma.medicalOrder.findFirst).toHaveBeenCalledWith({
                where: mockPrismaWhere,
                include: { externalKeys: true }
            });
            expect(OrderDomainMapper.toDomain).toHaveBeenCalledWith(prismaResult);
            expect(result).toEqual(domainResult);
        });

        it("should return null when no match is found", async () => {
            prisma.medicalOrder.findFirst.mockResolvedValue(null);

            const result = await repository.findOneAsync(mockFilter);

            expect(result).toBeNull();
        });

        it("should log and throw RepositoryError on Prisma error", async () => {
            const error = new Error("DB connection failed");
            prisma.medicalOrder.findFirst.mockRejectedValue(error);

            await expect(repository.findOneAsync(mockFilter)).rejects.toThrow(RepositoryError);
        });
    });


    describe('saveAsync', () => {
        const createFakeAggregate = (event: any): Order => ({
            uncommitted: jest.fn().mockReturnValue([event]),
        } as unknown as Order);

        beforeEach(() => {
            jest.spyOn(AggregateEvent, "isAggregatedCreatedEvent").mockReturnValue(false);
            jest.spyOn(OrderIsEvent, "isOrderMailSendedEvent").mockReturnValue(false);
            jest.spyOn(OrderIsEvent, "isOrderStatusChangedToCreatedEvent").mockReturnValue(false);
            jest.spyOn(OrderIsEvent, "isOrderStatusChangedToValidatedEvent").mockReturnValue(false);
            jest.spyOn(OrderIsEvent, "isOrderRemovedEvent").mockReturnValue(false);
            jest.spyOn(OrderIsEvent, "isOrderExternalKeyAddedEvent").mockReturnValue(false);
        });

        it("should call createOrder when event is OrderCreatedEvent", async () => {
            const aggregate = createFakeAggregate({ key: "OrderCreatedEvent", value: {} });

            jest.spyOn(AggregateEvent, "isAggregatedCreatedEvent").mockReturnValue(true);
            const spy = jest.spyOn(repository, "createOrder").mockResolvedValue();

            await repository.saveAsync(aggregate);

            expect(spy).toHaveBeenCalledWith(aggregate);
        });

        it("should call editOrder when event is OrderMailSendedEvent", async () => {
            const payload = { medicalOrderId: "1", password: "secure" };
            const aggregate = createFakeAggregate({ key: "OrderMailSendedEvent", value: payload });

            jest.spyOn(OrderIsEvent, "isOrderMailSendedEvent").mockReturnValue(true);
            const spy = jest.spyOn(repository, "editOrder").mockResolvedValue();

            await repository.saveAsync(aggregate);

            expect(spy).toHaveBeenCalledWith(payload);
        });

        it("should call changeToCreated when event is OrderStatusChangedToCreatedEvent", async () => {
            const payload = { medicalOrderId: "1", password: "secure" };
            const aggregate = createFakeAggregate({ key: "OrderStatusChangedToCreatedEvent", value: payload });

            jest.spyOn(OrderIsEvent, "isOrderStatusChangedToCreatedEvent").mockReturnValue(true);
            const spy = jest.spyOn(repository, "changeToCreated").mockResolvedValue();

            await repository.saveAsync(aggregate);

            expect(spy).toHaveBeenCalledWith(payload);
        });

        it("should call changeToValidated when event is OrderStatusChangedToValidatedEvent", async () => {
            const payload = { medicalOrderId: "1", password: "secure" };
            const aggregate = createFakeAggregate({ key: "OrderStatusChangedToValidatedEvent", value: payload });

            jest.spyOn(OrderIsEvent, "isOrderStatusChangedToValidatedEvent").mockReturnValue(true);
            const spy = jest.spyOn(repository, "changeToValidated").mockResolvedValue();

            await repository.saveAsync(aggregate);

            expect(spy).toHaveBeenCalledWith(payload);
        });

        it("should call removeOrder when event is OrderRemovedEvent", async () => {
            const payload = { medicalOrderId: "1", password: "secure" };
            const aggregate = createFakeAggregate({ key: "OrderRemovedEvent", value: payload });

            jest.spyOn(OrderIsEvent, "isOrderRemovedEvent").mockReturnValue(true);
            const spy = jest.spyOn(repository, "removeOrder").mockResolvedValue();

            await repository.saveAsync(aggregate);

            expect(spy).toHaveBeenCalledWith(payload);
        });

        it("should call addOrderExternalKey when event is OrderExternalKeyAddedEvent", async () => {
            const payload = { medicalOrderId: "1", password: "secure" };
            const aggregate = createFakeAggregate({ key: "OrderExternalKeyAddedEvent", value: payload });

            jest.spyOn(OrderIsEvent, "isOrderExternalKeyAddedEvent").mockReturnValue(true);
            const spy = jest.spyOn(repository, "addOrderExternalKey").mockResolvedValue();

            await repository.saveAsync(aggregate);

            expect(spy).toHaveBeenCalledWith(payload);
        });


        it("should call changeProcessOrder when event is OrderProcessChangedEvent", async () => {
            const payload = { medicalOrderId: "1", password: "secure" };
            const aggregate = createFakeAggregate({ key: "OrderProcessChangedEvent", value: payload });

            jest.spyOn(OrderIsEvent, "isOrderProcessChangedEvent").mockReturnValue(true);
            const spy = jest.spyOn(repository, "changeProcessOrder").mockResolvedValue();

            await repository.saveAsync(aggregate);

            expect(spy).toHaveBeenCalledWith(payload);
        });
    });

    describe('Internal Methods', () => {
        describe("createOrder", () => {
            const value = {} as unknown as Order;
            const mapped: Prisma.MedicalOrderUncheckedCreateInput = {
                doctorDni: "012345678",
                doctorFullname: "Doctor",
                doctorSignature: "Signature",
                locationCorporativeName: "Corporative",
                locationCompanyRuc: "0123456789001",
                locationCompanyName: "Company",
                locationBranchName: "Branch",
                process: "Post-Ocupacional",
                year: 2025,
                clientId: "client-id-123"
            };

            it('should call Prisma create with mapped order domain data', async () => {
                jest.spyOn(OrderDomainMapper, "toPrisma").mockReturnValue(mapped);

                await repository.createOrder(value);

                expect(OrderDomainMapper.toPrisma).toHaveBeenCalledWith(value);
                expect(prisma.medicalOrder.create).toHaveBeenCalledWith({ data: mapped });
            });

            it('should throw RepositoryError when Prisma throws an exception', async () => {
                prisma.medicalOrder.create.mockRejectedValue(Error);

                jest.spyOn(OrderDomainMapper, "toPrisma").mockReturnValue(mapped);

                await expect(repository.createOrder(value)).rejects.toThrow(RepositoryError);
            });
        });

        describe("editOrder", () => {
            const value: OrderMailSendedEventPayload = {
                orderId: "order-id-123"
            };

            it('should update order email flag to true using Prisma', async () => {
                await repository.editOrder(value);

                expect(prisma.medicalOrder.update).toHaveBeenCalledWith({
                    where: { id: value.orderId },
                    data: { email: true }
                });
            });

            it('should throw RepositoryError when Prisma throws an exception', async () => {
                prisma.medicalOrder.update.mockRejectedValue(Error);

                await expect(repository.editOrder(value)).rejects.toThrow(RepositoryError);
            });
        });

        describe("changeToCreated", () => {
            const value: OrderStatusChangedToCreatedEventPayload = {
                orderId: "order-id-123"
            };

            it('should update order status to "created" using Prisma', async () => {
                await repository.changeToCreated(value);

                expect(prisma.medicalOrder.update).toHaveBeenCalledWith({
                    where: { id: value.orderId },
                    data: { status: "created" }
                });
            });

            it('should throw RepositoryError when Prisma throws an exception', async () => {
                prisma.medicalOrder.update.mockRejectedValue(Error);

                await expect(repository.changeToCreated(value)).rejects.toThrow(RepositoryError);
            });
        });


        describe('changeToValidated', () => {
            const value: OrderStatusChangedToValidatedEventPayload = {
                orderId: "order-id-123"
            }

            it('should update order status to "validated" using Prisma', async () => {
                await repository.changeToValidated(value);

                expect(prisma.medicalOrder.update).toHaveBeenCalledWith({
                    where: { id: value.orderId },
                    data: { status: "validated" }
                });
            });

            it('should throw RepositoryError when Prisma throws an exception', async () => {
                prisma.medicalOrder.update.mockRejectedValue(Error);

                await expect(repository.changeToValidated(value)).rejects.toThrow(RepositoryError);
            });
        });

        describe('removeOrder', () => {
            const value: OrderRemoveCommandPayload = {
                orderId: "order-id-123"
            };

            it('should mark the order as inactive using Prisma', async () => {
                await repository.removeOrder(value);

                expect(prisma.medicalOrder.update).toHaveBeenCalledWith({
                    where: { id: value.orderId },
                    data: { isActive: false }
                });
            });


            it('should throw RepositoryError when Prisma throws an exception', async () => {
                prisma.medicalOrder.update.mockRejectedValue(Error);

                await expect(repository.removeOrder(value)).rejects.toThrow(RepositoryError);
            });
        });

        describe('changeProcessOrder', () => {
            const value: OrderProcessChangedEventPayload = {
                orderId: "order-id-123",
                process: 'New Process'
            };

            it('should update the order with the new process Prisma', async () => {
                await repository.changeProcessOrder(value);

                expect(prisma.medicalOrder.update).toHaveBeenCalledWith({
                    where: { id: value.orderId },
                    data: { process: value.process }
                });
            });


            it('should throw RepositoryError when Prisma throws an exception', async () => {
                prisma.medicalOrder.update.mockRejectedValue(Error);

                await expect(repository.changeProcessOrder(value)).rejects.toThrow(RepositoryError);
            });
        });

        describe('addOrderExternalKey', () => {
            const value: OrderExternalKey = {
                owner: 'order-owner',
                value: 'order-value',
                orderId: 'order-id-123'
            } as unknown as OrderExternalKey;

            it('should create a new external key linked to the order using Prisma', async () => {
                await repository.addOrderExternalKey(value);

                expect(prisma.medicalOrderExternalKey.create).toHaveBeenCalledWith({
                    data: {
                        owner: value.owner,
                        value: value.value,
                        orderId: value.orderId
                    }
                });
            });

            it('should throw RepositoryError when Prisma throws an exception', async () => {
                prisma.medicalOrderExternalKey.create.mockRejectedValue(Error);

                await expect(repository.addOrderExternalKey(value)).rejects.toThrow(RepositoryError);
            });

        });
    });
});