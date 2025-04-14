import { QueryHandlerAsync } from "@shared/shared/application";
import { ModelRepository } from "@shared/shared/providers";
import { PdfProvider } from "@shared/shared/providers/pdf.provider";
import { OrderNotFoundError } from "@omega/medical/core/domain/order/errors/order.errors";
import { OrderChecklistModel } from "@omega/medical/core/model/order/order-checklist.model";

export type OrderChecklistLayoutFunc = (value: OrderChecklistModel[]) => unknown;
export type OrderChecklistGetFileQueryPayload = {
    orderId: string;
}
export class OrderChecklistGetFileQuery implements QueryHandlerAsync<OrderChecklistGetFileQueryPayload, Buffer> {
    constructor(
        private readonly repository: ModelRepository<OrderChecklistModel>,
        private readonly pdf: PdfProvider,
        private readonly layout: OrderChecklistLayoutFunc
    ) { }

    async handleAsync(query: OrderChecklistGetFileQueryPayload): Promise<Buffer> {
        const values = await this.repository.findManyAsync({ filter: [{ field: 'orderId', operator: 'eq', value: query.orderId }] });
        if (!values.length) throw new OrderNotFoundError(query.orderId);

        const buffer = await this.pdf.craft(this.layout(values));
        return buffer;
    }

}