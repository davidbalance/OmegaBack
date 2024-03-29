import { SelectorOption } from "@/shared";

export class CreateWebReportElementResponseDTO { }

export class FindWebReportElementFieldsResponseDTO {
    public readonly options: SelectorOption<string>[];
    public readonly mandatoryFields: string[];
}