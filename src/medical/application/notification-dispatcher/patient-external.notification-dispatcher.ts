import { NotificationProvider } from "@shared/shared/providers/notification.provider";
import { PatientExternalSourceResolverPayload } from "../resolver/patient-external-source.resolver";

export type PatientExternalNotificationDispatcherPayload = PatientExternalSourceResolverPayload;
export interface PatientExternalNotificationDispatcher extends NotificationProvider<PatientExternalNotificationDispatcherPayload> { }