import { Injectable, Provider } from "@nestjs/common";
import { ClientFindMassiveLoadTemplateQueryImpl } from "@omega/medical/application/queries/client/client-find-massive-load-template.query";
import { SpreadsheetProvider } from "@shared/shared/providers";
import { InjectSpreadSheet } from "@shared/shared/nest/inject";
import { ClientFindMassiveLoadTemplateQueryToken } from "../../inject/query.inject";

@Injectable()
class ClientFindMassiveLoadTemplateNestQuery extends ClientFindMassiveLoadTemplateQueryImpl {
    constructor(
        @InjectSpreadSheet() spreadsheet: SpreadsheetProvider
    ) {
        super(spreadsheet);
    }
}

export const ClientFindMassiveLoadTemplateQueryProvider: Provider = {
    provide: ClientFindMassiveLoadTemplateQueryToken,
    useClass: ClientFindMassiveLoadTemplateNestQuery
}