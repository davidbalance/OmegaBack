import { NotificationProvider } from "@shared/shared/providers/notification.provider";
import { TestExternalSourceResolverPayload } from "../resolver/test-external-source.resolver";
import { OrderExternalCreatedEventPayload } from "./order-external.notification-dispatcher";

export type TestExternalCreatedEventPayload = TestExternalSourceResolverPayload & OrderExternalCreatedEventPayload;
export type TestExternalNotificationDispatcher = NotificationProvider<TestExternalCreatedEventPayload>;