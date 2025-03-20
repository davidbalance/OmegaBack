import { Injectable, Provider } from "@nestjs/common";
import { ClientFindMassiveLoadTemplateQuery, MassiveLoadTemplate } from "@omega/medical/application/queries/client/client-find-massive-load-template.query";
import { SpreadsheetProvider } from "@shared/shared/providers";
import { InjectSpreadSheet } from "@shared/shared/nest/inject";
import { ClientFindMassiveLoadTemplateQueryToken } from "../../inject/query.inject";

@Injectable()
class ClientFindMassiveLoadTemplateNestQuery extends ClientFindMassiveLoadTemplateQuery {
    constructor(
        @InjectSpreadSheet() spreadsheet: SpreadsheetProvider<MassiveLoadTemplate>
    ) {
        super(spreadsheet);
    }
}

export const ClientFindMassiveLoadTemplateQueryProvider: Provider = {
    provide: ClientFindMassiveLoadTemplateQueryToken,
    useClass: ClientFindMassiveLoadTemplateNestQuery
}