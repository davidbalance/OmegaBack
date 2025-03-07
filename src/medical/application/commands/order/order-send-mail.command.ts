import { CommandHandlerAsync } from "@shared/shared/application";
import { AggregateRepository } from "@shared/shared/providers";
import { EmailAttachment, EmailProvider } from "@shared/shared/providers/email.provider";
import { OrderNotFoundError } from "@omega/medical/core/domain/order/errors/order.errors";
import { Order, OrderProps } from "@omega/medical/core/domain/order/order.domain";
import { HtmlLoaderProvider } from "@shared/shared/providers/html-loader.provider";

export type OrderSendMailCommandPayload = {
    orderId: string;
    email: string;
}
export class OrderSendMailCommand implements CommandHandlerAsync<OrderSendMailCommandPayload, void> {
    constructor(
        private readonly repository: AggregateRepository<OrderProps, Order>,
        private readonly emailEmitter: EmailProvider,
        private readonly layout: HtmlLoaderProvider<{ url: string, patientFullname: string }>,
        private readonly attachment: EmailAttachment[],
        private readonly redirectUrl: string
    ) { }

    async handleAsync(value: OrderSendMailCommandPayload): Promise<void> {
        const order = await this.repository.findOneAsync({ filter: [{ field: 'id', operator: 'eq', value: value.orderId }] });
        if (!order) throw new OrderNotFoundError(value.orderId);

        await this.emailEmitter.send({
            recipient: value.email,
            content: this.layout({ url: `${this.redirectUrl}/${order.id}`, patientFullname: "" }),
            subject: 'Resultados Ocupacionales',
            type: 'html',
            attachments: this.attachment
        });

        order.sendMail();
        await this.repository.saveAsync(order);
    }
}