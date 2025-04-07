import { Inject } from "@nestjs/common";

export const PatientExternalNotificationDispatcherToken = 'PatientExternalNotificationDispatcher';
export const OrderExternalNotificationDispatcherToken = 'OrderExternalNotificationDispatcher';
export const TestExternalNotificationDispatcherToken = 'TestExternalNotificationDispatcher';

const Dispatcher = {
    PatientExternal: PatientExternalNotificationDispatcherToken,
    OrderExternal: OrderExternalNotificationDispatcherToken,
    TestExternal: TestExternalNotificationDispatcherToken,
}

export const InjectNotificationDispatcher = (token: keyof typeof Dispatcher) => Inject(Dispatcher[token]);

export const medicalEvent = {
    testCreated: 'medical.test.created',
    orderCreated: 'medical.order.created',
    patientCreated: 'medical.patient.created',
}