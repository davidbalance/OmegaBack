import { SelectorOption } from "@/shared";
import { Expose, Type } from "class-transformer";

class SelectorOptionCompanyDTO implements SelectorOption<number> {
    @Expose()
    public readonly key: number;

    @Expose()
    public readonly label: string;
}

export class GETSelectorOptionArrayResponseDTO {
    @Type(() => SelectorOptionCompanyDTO)
    @Expose()
    public readonly options: SelectorOptionCompanyDTO[];
}