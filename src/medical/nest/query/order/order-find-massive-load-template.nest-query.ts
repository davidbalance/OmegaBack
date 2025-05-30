import { Injectable, Provider } from "@nestjs/common";
import { OrderFindMassiveLoadTemplateQueryToken } from "../../inject/query.inject";
import { OrderFindMassiveLoadTemplateQueryImpl } from "@omega/medical/application/queries/order/order-find-massive-load-template.query";
import { InjectSpreadSheet } from "@shared/shared/nest/inject";
import { SpreadsheetProvider } from "@shared/shared/providers";
import { InjectProvider } from "../../inject/provider.inject";
import { ExamColumnProvider } from "@omega/medical/application/providers/exam-column.provider";

@Injectable()
class OrderFindMassiveLoadTemplateNestQuery extends OrderFindMassiveLoadTemplateQueryImpl {
    constructor(
        @InjectSpreadSheet() spreadsheet: SpreadsheetProvider,
        @InjectProvider('ExamColumn') provider: ExamColumnProvider
    ) {
        super(spreadsheet, provider);
    }
}

export const OrderFindMassiveLoadTemplateQueryProvider: Provider = {
    provide: OrderFindMassiveLoadTemplateQueryToken,
    useClass: OrderFindMassiveLoadTemplateNestQuery
}