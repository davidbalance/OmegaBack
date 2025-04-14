import { EventEmitter2 } from "@nestjs/event-emitter";
import { Test, TestingModule } from "@nestjs/testing";
import { PatientExternalNestNotificationDispatcher } from "../patient-external.nest-notification-dispatcher";
import { medicalEvent } from "../../inject/notification-dispatcher.inject";
import { TestExternalNestNotificationDispatcher } from "../test-external.nest-notification-dispatcher";
import { TestExternalCreatedEventPayload } from "@omega/medical/application/notification-dispatcher/test-external.notification-dispatcher";

describe('TestExternalNestNotificationDispatcher', () => {
    let eventEmitter: jest.Mocked<EventEmitter2>;
    let dispatcher: TestExternalNestNotificationDispatcher;
    let payload: TestExternalCreatedEventPayload;

    beforeEach(async () => {
        eventEmitter = {
            emitAsync: jest.fn(),
        } as unknown as jest.Mocked<EventEmitter2>;

        const module: TestingModule = await Test.createTestingModule({
            providers: [
                TestExternalNestNotificationDispatcher,
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
            orderId: 'order-id',
            testKey: 'Sample value',
            examName: 'Test exam',
            examSubtype: 'Test subtype-exam',
            examType: 'Test type-exam'
        }

        dispatcher = module.get<TestExternalNestNotificationDispatcher>(TestExternalNestNotificationDispatcher);
    });

    it('should call eventEmitter.emitAsync when all required keys are present in payload', async () => {

        const superSpy = jest.spyOn(PatientExternalNestNotificationDispatcher.prototype, 'emitAsync');

        const validPayload: TestExternalCreatedEventPayload = {
            ...payload,
            examKey: "exam-key-1",
            examSubtypeKey: "subtype-key-1",
            examTypeKey: "type-key-1"
        }

        await dispatcher.emitAsync(validPayload);

        expect(superSpy).toHaveBeenCalledWith(validPayload);
        expect(eventEmitter.emitAsync).toHaveBeenCalledWith(medicalEvent.testCreated, validPayload);
    });

    it('should not call eventEmitter.emitAsync if any required key is missing in payload', async () => {

        const superSpy = jest.spyOn(PatientExternalNestNotificationDispatcher.prototype, 'emitAsync');

        const invalidPayload: TestExternalCreatedEventPayload = { ...payload }

        await dispatcher.emitAsync(invalidPayload);

        expect(superSpy).toHaveBeenCalledWith(invalidPayload);
        expect(eventEmitter.emitAsync).not.toHaveBeenCalled();
    });
});
