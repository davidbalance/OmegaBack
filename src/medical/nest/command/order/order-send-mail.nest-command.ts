import { Inject, Injectable, Provider } from "@nestjs/common";
import { OrderRepository } from "@omega/medical/application/repository/aggregate.repositories";
import { InjectAggregateRepository } from "../../inject/aggregate-repository.inject";
import { OrderSendMailCommandToken } from "../../inject/command.inject";
import { OrderSendMailCommand } from "@omega/medical/application/commands/order/order-send-mail.command";
import { HtmlLoaderProviderToken, InjectEmail } from "@shared/shared/nest/inject";
import { EmailAttachmentToken, RedirectEmailUrlToken } from "../../inject/function.inject";
import { EmailAttachment, EmailProvider } from "@shared/shared/providers/email.provider";
import { HtmlLoaderProvider } from "@shared/shared/providers/html-loader.provider";

@Injectable()
class OrderSendMailNestCommand extends OrderSendMailCommand {
    constructor(
        @InjectAggregateRepository("Order") repository: OrderRepository,
        @InjectEmail() email: EmailProvider,
        @Inject(HtmlLoaderProviderToken) layout: HtmlLoaderProvider<{ url: string, patientFullname: string }>,
        @Inject(EmailAttachmentToken) attachment: EmailAttachment[],
        @Inject(RedirectEmailUrlToken) redirectUrl: string
    ) {
        super(repository, email, layout, attachment, redirectUrl);
    }
}

export const OrderSendMailCommandProvider: Provider = {
    provide: OrderSendMailCommandToken,
    useClass: OrderSendMailNestCommand
}