import { NotificationProvider } from "@shared/shared/providers/notification.provider";
import { TestExternalSourceResolverPayload } from "../resolver/test-external-source.resolver";

export type TestExternalNotificationDispatcherPayload = TestExternalSourceResolverPayload;
export interface TestExternalNotificationDispatcher extends NotificationProvider<TestExternalNotificationDispatcherPayload> { }