import { Logger } from "@nestjs/common";
import { UserPrismaRepository } from "../user.prisma-repository";
import { Test, TestingModule } from "@nestjs/testing";
import { AggregateEvent, SearchCriteria } from "@shared/shared/domain";
import { PrismaService } from "@omega/adapter/persistence/prisma/prisma.service";
import { PrismaFilterMapper } from "@omega/adapter/persistence/prisma/filter-mapper";
import { RepositoryError } from "@shared/shared/domain/error";
import { Prisma } from "@prisma/client";
import { User, UserProps } from "@omega/profile/core/domain/user/user.domain";
import { UserDomainMapper } from "@omega/adapter/persistence/prisma/mapper/profile/domain/user.domain-mapper";
import { UserAttributeRemovedEventPayload, UserAttributeUpdatedValueEventPayload, UserAuthAddedEventPayload, UserAuthRemovedEventPayload, UserDoctorAddFileEventPayload, UserEditedEventPayload, UserIsEvent, UserRemovedEventPayload } from "@omega/profile/core/domain/user/events/user.events";
import { Attribute } from "@omega/profile/core/domain/user/attribute.domain";
import { AttributeDomainMapper } from "@omega/adapter/persistence/prisma/mapper/profile/domain/attribute.domain-mapper";
import { Patient } from "@omega/profile/core/domain/user/patient.domain";
import { PatientDomainMapper } from "@omega/adapter/persistence/prisma/mapper/profile/domain/patient.domain-mapper";
import { Doctor } from "@omega/profile/core/domain/user/doctor.domain";
import { DoctorDomainMapper } from "@omega/adapter/persistence/prisma/mapper/profile/domain/doctor.domain-mapper";

describe("UserPrismaRepository", () => {
    let repository: UserPrismaRepository;
    let prisma: { user: any; attribute: any; patient: any; doctor: any; };

    beforeEach(async () => {
        jest.spyOn(Logger, 'error').mockImplementation(() => { });
        prisma = {
            user: {
                findFirst: jest.fn(),
                create: jest.fn(),
                update: jest.fn(),
            },
            attribute: {
                create: jest.fn(),
                update: jest.fn(),
                delete: jest.fn(),
            },
            patient: {
                create: jest.fn(),
            },
            doctor: {
                create: jest.fn(),
                update: jest.fn(),
            },
        };

        const module: TestingModule = await Test.createTestingModule({
            providers: [
                UserPrismaRepository,
                { provide: PrismaService, useValue: prisma }
            ]
        }).compile();

        repository = module.get<UserPrismaRepository>(UserPrismaRepository);
    });

    afterAll(() => {
        jest.clearAllMocks();
    })

    describe('findOneAsync', () => {
        const mockFilter: SearchCriteria<UserProps> = { filter: [{ field: "id", operator: "eq", value: "test-id-123" }] };
        const mockPrismaWhere = { email: "test@mail.com" };

        beforeEach(() => {
            jest.spyOn(PrismaFilterMapper, "map").mockReturnValue(mockPrismaWhere);
        });

        it("should return domain object when match is found", async () => {
            const prismaResult = { id: "user-1" };
            const domainResult = { id: "user-1" };

            prisma.user.findFirst.mockResolvedValue(prismaResult);
            jest.spyOn(UserDomainMapper, "toDomain").mockReturnValue(domainResult as any);

            const result = await repository.findOneAsync(mockFilter);

            expect(PrismaFilterMapper.map).toHaveBeenCalledWith(mockFilter.filter);
            expect(prisma.user.findFirst).toHaveBeenCalledWith({
                where: mockPrismaWhere,
                include: { attributes: true, doctor: true, patient: true },
            });
            expect(UserDomainMapper.toDomain).toHaveBeenCalledWith(prismaResult);
            expect(result).toEqual(domainResult);
        });

        it("should return null when no match is found", async () => {
            prisma.user.findFirst.mockResolvedValue(null);

            const result = await repository.findOneAsync(mockFilter);

            expect(result).toBeNull();
        });

        it("should log and throw RepositoryError on Prisma error", async () => {
            const error = new Error("DB connection failed");
            prisma.user.findFirst.mockRejectedValue(error);

            await expect(repository.findOneAsync(mockFilter)).rejects.toThrow(RepositoryError);
        });
    });


    describe('saveAsync', () => {
        const createFakeAggregate = (event: any): User => ({
            uncommitted: jest.fn().mockReturnValue([event]),
        } as unknown as User);

        beforeEach(() => {
            jest.spyOn(AggregateEvent, "isAggregatedCreatedEvent").mockReturnValue(false);
            jest.spyOn(UserIsEvent, "isUserEditedEvent").mockReturnValue(false);
            jest.spyOn(UserIsEvent, "isUserRemovedEvent").mockReturnValue(false);
            jest.spyOn(UserIsEvent, "isUserAuthAddedEvent").mockReturnValue(false);
            jest.spyOn(UserIsEvent, "isUserAuthRemovedEvent").mockReturnValue(false);
            jest.spyOn(UserIsEvent, "isUserAttributeAddedEvent").mockReturnValue(false);
            jest.spyOn(UserIsEvent, "isUserAttributeUpdatedValueEvent").mockReturnValue(false);
            jest.spyOn(UserIsEvent, "isUserAttributeRemovedEvent").mockReturnValue(false);
            jest.spyOn(UserIsEvent, "isUserPatientAddedEvent").mockReturnValue(false);
            jest.spyOn(UserIsEvent, "isUserDoctorAddedEvent").mockReturnValue(false);
            jest.spyOn(UserIsEvent, "isUserDoctorAddFileEvent").mockReturnValue(false);
        });

        it("should call createUser when event is UserCreatedEvent", async () => {
            const aggregate = createFakeAggregate({ key: "UserCreatedEvent", value: {} });

            jest.spyOn(AggregateEvent, "isAggregatedCreatedEvent").mockReturnValue(true);
            const spy = jest.spyOn(repository, "createUser").mockResolvedValue();

            await repository.saveAsync(aggregate);

            expect(spy).toHaveBeenCalledWith(aggregate);
        });

        it("should call editUser when event is UserEditedEvent", async () => {
            const payload = { userId: "1", password: "secure" };
            const aggregate = createFakeAggregate({ key: "UserEditedEvent", value: payload });

            jest.spyOn(UserIsEvent, "isUserEditedEvent").mockReturnValue(true);
            const spy = jest.spyOn(repository, "editUser").mockResolvedValue();

            await repository.saveAsync(aggregate);

            expect(spy).toHaveBeenCalledWith(payload);
        });

        it("should call removeUser when event is UserRemovedEvent", async () => {
            const payload = { userId: "1", password: "secure" };
            const aggregate = createFakeAggregate({ key: "UserRemovedEvent", value: payload });

            jest.spyOn(UserIsEvent, "isUserRemovedEvent").mockReturnValue(true);
            const spy = jest.spyOn(repository, "removeUser").mockResolvedValue();

            await repository.saveAsync(aggregate);

            expect(spy).toHaveBeenCalledWith(payload);
        });

        it("should call addAuth when event is UserAuthAddedEvent", async () => {
            const payload = { userId: "1", password: "secure" };
            const aggregate = createFakeAggregate({ key: "UserAuthAddedEvent", value: payload });

            jest.spyOn(UserIsEvent, "isUserAuthAddedEvent").mockReturnValue(true);
            const spy = jest.spyOn(repository, "addAuth").mockResolvedValue();

            await repository.saveAsync(aggregate);

            expect(spy).toHaveBeenCalledWith(payload);
        });

        it("should call removeAuth when event is UserAuthRemovedEvent", async () => {
            const payload = { userId: "1", password: "secure" };
            const aggregate = createFakeAggregate({ key: "UserAuthRemovedEvent", value: payload });

            jest.spyOn(UserIsEvent, "isUserAuthRemovedEvent").mockReturnValue(true);
            const spy = jest.spyOn(repository, "removeAuth").mockResolvedValue();

            await repository.saveAsync(aggregate);

            expect(spy).toHaveBeenCalledWith(payload);
        });

        it("should call addAttribute when event is UserAttributeAddedEvent", async () => {
            const payload = { userId: "1", password: "secure" };
            const aggregate = createFakeAggregate({ key: "UserAttributeAddedEvent", value: payload });

            jest.spyOn(UserIsEvent, "isUserAttributeAddedEvent").mockReturnValue(true);
            const spy = jest.spyOn(repository, "addAttribute").mockResolvedValue();

            await repository.saveAsync(aggregate);

            expect(spy).toHaveBeenCalledWith(payload);
        });

        it("should call updateAttribute when event is UserAttributeUpdatedValueEvent", async () => {
            const payload = { userId: "1", password: "secure" };
            const aggregate = createFakeAggregate({ key: "UserAttributeUpdatedValueEvent", value: payload });

            jest.spyOn(UserIsEvent, "isUserAttributeUpdatedValueEvent").mockReturnValue(true);
            const spy = jest.spyOn(repository, "updateAttribute").mockResolvedValue();

            await repository.saveAsync(aggregate);

            expect(spy).toHaveBeenCalledWith(payload);
        });

        it("should call removeAttribute when event is UserAttributeRemovedEvent", async () => {
            const payload = { userId: "1", password: "secure" };
            const aggregate = createFakeAggregate({ key: "UserAttributeRemovedEvent", value: payload });

            jest.spyOn(UserIsEvent, "isUserAttributeRemovedEvent").mockReturnValue(true);
            const spy = jest.spyOn(repository, "removeAttribute").mockResolvedValue();

            await repository.saveAsync(aggregate);

            expect(spy).toHaveBeenCalledWith(payload);
        });

        it("should call addPatient when event is UserPatientAddedEvent", async () => {
            const payload = { userId: "1", password: "secure" };
            const aggregate = createFakeAggregate({ key: "UserPatientAddedEvent", value: payload });

            jest.spyOn(UserIsEvent, "isUserPatientAddedEvent").mockReturnValue(true);
            const spy = jest.spyOn(repository, "addPatient").mockResolvedValue();

            await repository.saveAsync(aggregate);

            expect(spy).toHaveBeenCalledWith(payload);
        });

        it("should call addDoctor when event is UserDoctorAddedEvent", async () => {
            const payload = { userId: "1", password: "secure" };
            const aggregate = createFakeAggregate({ key: "UserDoctorAddedEvent", value: payload });

            jest.spyOn(UserIsEvent, "isUserDoctorAddedEvent").mockReturnValue(true);
            const spy = jest.spyOn(repository, "addDoctor").mockResolvedValue();

            await repository.saveAsync(aggregate);

            expect(spy).toHaveBeenCalledWith(payload);
        });

        it("should call addDoctorFile when event is UserDoctorAddFileEvent", async () => {
            const payload = { userId: "1", password: "secure" };
            const aggregate = createFakeAggregate({ key: "UserDoctorAddFileEvent", value: payload });

            jest.spyOn(UserIsEvent, "isUserDoctorAddFileEvent").mockReturnValue(true);
            const spy = jest.spyOn(repository, "addDoctorFile").mockResolvedValue();

            await repository.saveAsync(aggregate);

            expect(spy).toHaveBeenCalledWith(payload);
        });
    });

    describe('Internal Methods', () => {
        describe("createUser", () => {
            const value = {} as unknown as User;
            const mapped: Prisma.UserUncheckedCreateInput = {
                dni: "0123456789",
                name: "User",
                lastname: "Lastname"
            };

            it('should create a new user using mapped domain data', async () => {
                jest.spyOn(UserDomainMapper, "toPrisma").mockReturnValue(mapped);

                await repository.createUser(value);

                expect(UserDomainMapper.toPrisma).toHaveBeenCalledWith(value);
                expect(prisma.user.create).toHaveBeenCalledWith({ data: mapped });
            });

            it('should throw RepositoryError when Prisma throws an exception', async () => {
                prisma.user.create.mockRejectedValue(Error);

                jest.spyOn(UserDomainMapper, "toPrisma").mockReturnValue(mapped);

                await expect(repository.createUser(value)).rejects.toThrow(RepositoryError);
            });
        });

        describe("editUser", () => {
            const value: UserEditedEventPayload = {
                userId: "user-id-123",
                userName: "User",
                userLastname: "Lastname"
            };

            it('should update user name and lastname based on event payload', async () => {
                await repository.editUser(value);

                expect(prisma.user.update).toHaveBeenCalledWith({
                    where: { id: value.userId },
                    data: {
                        name: value.userName,
                        lastname: value.userLastname
                    }
                });
            });

            it('should throw RepositoryError when Prisma throws an exception', async () => {
                prisma.user.update.mockRejectedValue(Error);

                await expect(repository.editUser(value)).rejects.toThrow(RepositoryError);
            });
        });

        describe("removeUser", () => {
            const value: UserRemovedEventPayload = {
                userId: "user-id-123"
            };

            it('should set isActive to false for the given user', async () => {
                await repository.removeUser(value);

                expect(prisma.user.update).toHaveBeenCalledWith({
                    where: { id: value.userId },
                    data: { isActive: false }
                });
            });

            it('should throw RepositoryError when Prisma throws an exception', async () => {
                prisma.user.update.mockRejectedValue(Error);

                await expect(repository.removeUser(value)).rejects.toThrow(RepositoryError);
            });
        });


        describe('addAuth', () => {
            const value: UserAuthAddedEventPayload = {
                auth: "auth-123",
                userId: "user-id-123"
            };

            it('should update auth field of the user', async () => {
                await repository.addAuth(value);

                expect(prisma.user.update).toHaveBeenCalledWith({
                    where: { id: value.userId },
                    data: { auth: value.auth }
                });
            });

            it('should throw RepositoryError when Prisma throws an exception', async () => {
                prisma.user.update.mockRejectedValue(Error);

                await expect(repository.addAuth(value)).rejects.toThrow(RepositoryError);
            });
        });

        describe('removeAuth', () => {
            const value: UserAuthRemovedEventPayload = {
                userId: "user-id-123"
            };

            it('should nullify the auth field of the user', async () => {
                await repository.removeAuth(value);

                expect(prisma.user.update).toHaveBeenCalledWith({
                    where: { id: value.userId },
                    data: { auth: null }
                });
            });

            it('should throw RepositoryError when Prisma throws an exception', async () => {
                prisma.user.update.mockRejectedValue(Error);

                await expect(repository.removeAuth(value)).rejects.toThrow(RepositoryError);
            });
        });

        describe('addAttribute', () => {
            const value: Attribute = {} as unknown as Attribute;
            const mapped: Prisma.AttributeUncheckedCreateInput = {
                name: "Sample Attribute",
                value: "attribute-value",
                userId: "user-id-123"
            };

            it('should create a new attribute using mapped domain data', async () => {
                jest.spyOn(AttributeDomainMapper, "toPrisma").mockReturnValue(mapped);
                await repository.addAttribute(value);

                expect(prisma.attribute.create).toHaveBeenCalledWith({ data: mapped });
            });

            it('should throw RepositoryError when Prisma throws an exception', async () => {
                prisma.attribute.create.mockRejectedValue(Error);

                await expect(repository.addAttribute(value)).rejects.toThrow(RepositoryError);
            });

        });

        describe('updateAttribute', () => {
            const value: UserAttributeUpdatedValueEventPayload = {
                attributeId: "attribute-id-123",
                attributeValue: "attribute-value"
            };

            it('should update the value of an attribute', async () => {
                await repository.updateAttribute(value);

                expect(prisma.attribute.update).toHaveBeenCalledWith({
                    where: { id: value.attributeId },
                    data: { value: value.attributeValue }
                });
            });

            it('should throw RepositoryError when Prisma throws an exception', async () => {
                prisma.attribute.update.mockRejectedValue(Error);

                await expect(repository.updateAttribute(value)).rejects.toThrow(RepositoryError);
            });

        });

        describe('removeAttribute', () => {
            const value: UserAttributeRemovedEventPayload = {
                attributeId: "attribute-id-123"
            };

            it('should delete the specified attribute', async () => {
                await repository.removeAttribute(value);

                expect(prisma.attribute.delete).toHaveBeenCalledWith({
                    where: { id: value.attributeId }
                });
            });

            it('should throw RepositoryError when Prisma throws an exception', async () => {
                prisma.attribute.delete.mockRejectedValue(Error);

                await expect(repository.removeAttribute(value)).rejects.toThrow(RepositoryError);
            });

        });

        describe('addPatient', () => {
            const value: Patient = {} as unknown as Patient;
            const mapped: Prisma.PatientUncheckedCreateInput = {
                birthday: new Date(),
                userId: "user-id-123"
            };

            it('should create a new patient using mapped domain data', async () => {
                jest.spyOn(PatientDomainMapper, "toPrisma").mockReturnValue(mapped);
                await repository.addPatient(value);

                expect(prisma.patient.create).toHaveBeenCalledWith({ data: mapped });
            });

            it('should throw RepositoryError when Prisma throws an exception', async () => {
                prisma.patient.create.mockRejectedValue(Error);

                await expect(repository.addPatient(value)).rejects.toThrow(RepositoryError);
            });

        });

        describe('addDoctor', () => {
            const value: Doctor = {} as unknown as Doctor;
            const mapped: Prisma.DoctorUncheckedCreateInput = {
                signature: "Doctor Signature",
                userId: "user-id-123"
            };

            it('should create a new doctor using mapped domain data', async () => {
                jest.spyOn(DoctorDomainMapper, "toPrisma").mockReturnValue(mapped);
                await repository.addDoctor(value);

                expect(prisma.doctor.create).toHaveBeenCalledWith({ data: mapped });
            });

            it('should throw RepositoryError when Prisma throws an exception', async () => {
                prisma.doctor.create.mockRejectedValue(Error);

                await expect(repository.addDoctor(value)).rejects.toThrow(RepositoryError);
            });

        });

        describe('addDoctorFile', () => {
            const value: UserDoctorAddFileEventPayload = {
                doctorId: "doctor-id-123"
            };

            it('should update the doctor to indicate a file has been added', async () => {
                await repository.addDoctorFile(value);

                expect(prisma.doctor.update).toHaveBeenCalledWith({
                    where: { id: value.doctorId },
                    data: { hasFile: true }
                });
            });

            it('should throw RepositoryError when Prisma throws an exception', async () => {
                prisma.doctor.update.mockRejectedValue(Error);

                await expect(repository.addDoctorFile(value)).rejects.toThrow(RepositoryError);
            });

        });

    });
});