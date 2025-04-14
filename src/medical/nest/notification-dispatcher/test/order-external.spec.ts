import { EventEmitter2 } from "@nestjs/event-emitter";
import { OrderExternalNestNotificationDispatcher } from "../order-external.nest-notification-dispatcher";
import { Test, TestingModule } from "@nestjs/testing";
import { OrderExternalCreatedEventPayload } from "@omega/medical/application/notification-dispatcher/order-external.notification-dispatcher";
import { PatientExternalNestNotificationDispatcher } from "../patient-external.nest-notification-dispatcher";
import { medicalEvent } from "../../inject/notification-dispatcher.inject";

describe('OrderExternalNestNotificationDispatcher', () => {
    let eventEmitter: jest.Mocked<EventEmitter2>;
    let dispatcher: OrderExternalNestNotificationDispatcher;
    let payload: OrderExternalCreatedEventPayload;

    beforeEach(async () => {
        eventEmitter = {
            emitAsync: jest.fn(),
        } as unknown as jest.Mocked<EventEmitter2>;

        const module: TestingModule = await Test.createTestingModule({
            providers: [
                OrderExternalNestNotificationDispatcher,
                { provide: EventEmitter2, useValue: eventEmitter },
            ],
        }).compile();

        payload = {
            owner: "external-owner",
            patientGender: "male",
            patientDni: "0000000100",
            patientName: "Test patient",
            patientLastname: "Test lastname",
            patientEmail: "sample@email.com",
            patientBirthday: new Date(),
            corporativeName: "Test corporative",
            companyRuc: "0000000100001",
            companyName: "Test company",
            branchName: "Test branch",
            doctorDni: "0000000100",
            doctorFullname: "Doctor",
            orderKey: "order-key-1",
            orderProcess: "Post-Ocupacional",
            orderYear: 2022,
        }

        dispatcher = module.get<OrderExternalNestNotificationDispatcher>(OrderExternalNestNotificationDispatcher);
    });

    it('should call eventEmitter.emitAsync when all required keys are present in payload', async () => {

        const superSpy = jest.spyOn(PatientExternalNestNotificationDispatcher.prototype, 'emitAsync');

        const validPayload: OrderExternalCreatedEventPayload = {
            ...payload,
            branchKey: "branch-key-1",
            companyKey: "company-key-1",
            corporativeKey: "corporative-key-1"
        }

        await dispatcher.emitAsync(validPayload);

        expect(superSpy).toHaveBeenCalledWith(validPayload);
        expect(eventEmitter.emitAsync).toHaveBeenCalledWith(medicalEvent.orderCreated, validPayload);
    });

    it('should not call eventEmitter.emitAsync if any required key is missing in payload', async () => {

        const superSpy = jest.spyOn(PatientExternalNestNotificationDispatcher.prototype, 'emitAsync');

        const invalidPayload: OrderExternalCreatedEventPayload = { ...payload }

        await dispatcher.emitAsync(invalidPayload);

        expect(superSpy).toHaveBeenCalledWith(invalidPayload);
        expect(eventEmitter.emitAsync).not.toHaveBeenCalled();
    });
});
