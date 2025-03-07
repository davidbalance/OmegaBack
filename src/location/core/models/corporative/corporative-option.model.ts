import { Model } from "@shared/shared/domain/model";
import { Option } from "@shared/shared/domain/option";
import { CompanyOption } from "./company-option.model";

export type CorporativeOption = Option & { children: CompanyOption[] };
export type CorporativeOptionModelProps = {
    companyValue: string;
    companyLabel: string;
    corporativeValue: string;
    corporativeLabel: string;
}
export class CorporativeOptionModel extends Model<CorporativeOptionModelProps> {
    public get corporativeValue(): Readonly<string> {
        return this.props.corporativeValue;
    }

    public get corporativeLabel(): Readonly<string> {
        return this.props.corporativeLabel;
    }

    public get companyValue(): Readonly<string> {
        return this.props.companyValue;
    }

    public get companyLabel(): Readonly<string> {
        return this.props.companyLabel;
    }
}