import { NotificationProvider } from "@shared/shared/providers/notification.provider";
import { OrderExternalSourceResolverPayload } from "../resolver/order-external-source.resolver";
import { PatientExternalCreatedEventPayload } from "./patient-external.notification-dispatcher";

export type OrderExternalCreatedEventPayload = OrderExternalSourceResolverPayload & PatientExternalCreatedEventPayload;
export type OrderExternalNotificationDispatcher = NotificationProvider<OrderExternalCreatedEventPayload>;