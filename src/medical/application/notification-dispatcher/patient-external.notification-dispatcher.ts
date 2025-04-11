import { NotificationProvider } from "@shared/shared/providers/notification.provider";
import { PatientExternalSourceResolverPayload } from "../resolver/patient-external-source.resolver";

export type PatientExternalCreatedEventPayload = PatientExternalSourceResolverPayload;
export interface PatientExternalNotificationDispatcher extends NotificationProvider<PatientExternalCreatedEventPayload> { }