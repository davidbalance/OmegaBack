import { Inject, Injectable, Provider } from "@nestjs/common";
import { OrderChecklistGetFileQueryImpl, OrderChecklistLayoutFunc } from "@omega/medical/application/queries/order/order-checklist-get-file.query";
import { OrderChecklistRepository } from "@omega/medical/application/repository/model.repositories";
import { InjectModelRepository } from "../../inject/model-repository.inject";
import { OrderChecklistGetFileQueryToken } from "../../inject/query.inject";
import { InjectPdf } from "@shared/shared/nest/inject";
import { PdfProvider } from "@shared/shared/providers/pdf.provider";
import { ChecklistLayoutToken } from "../../inject/function.inject";

@Injectable()
class OrderChecklistGetFileNestQuery extends OrderChecklistGetFileQueryImpl {
    constructor(
        @InjectModelRepository("OrderChecklist") repository: OrderChecklistRepository,
        @InjectPdf() pdf: PdfProvider,
        @Inject(ChecklistLayoutToken) layout: OrderChecklistLayoutFunc
    ) {
        super(repository, pdf, layout);
    }
}

export const OrderChecklistGetFileQueryProvider: Provider = {
    provide: OrderChecklistGetFileQueryToken,
    useClass: OrderChecklistGetFileNestQuery
}