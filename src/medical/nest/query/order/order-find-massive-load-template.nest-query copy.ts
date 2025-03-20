import { Injectable, Provider } from "@nestjs/common";
import { OrderFindMassiveLoadTemplateQueryToken } from "../../inject/query.inject";
import { MassiveLoadTemplate, OrderFindMassiveLoadTemplateQuery } from "@omega/medical/application/queries/order/order-find-massive-load-template.query";
import { InjectSpreadSheet } from "@shared/shared/nest/inject";
import { SpreadsheetProvider } from "@shared/shared/providers";

@Injectable()
class OrderFindMassiveLoadTemplateNestQuery extends OrderFindMassiveLoadTemplateQuery {
    constructor(
        @InjectSpreadSheet() spreadsheet: SpreadsheetProvider<MassiveLoadTemplate>
    ) {
        super(spreadsheet);
    }
}

export const OrderFindMassiveLoadTemplateQueryProvider: Provider = {
    provide: OrderFindMassiveLoadTemplateQueryToken,
    useClass: OrderFindMassiveLoadTemplateNestQuery
}