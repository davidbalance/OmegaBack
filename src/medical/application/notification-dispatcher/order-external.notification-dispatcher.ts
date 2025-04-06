import { NotificationProvider } from "@shared/shared/providers/notification.provider";
import { OrderExternalSourceResolverPayload } from "../resolver/order-external-source.resolver";

export type OrderExternalNotificationDispatcherPayload = OrderExternalSourceResolverPayload;
export interface OrderExternalNotificationDispatcher extends NotificationProvider<OrderExternalNotificationDispatcherPayload> { }