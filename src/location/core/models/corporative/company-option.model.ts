import { Model } from "@shared/shared/domain/model";
import { Option } from "@shared/shared/domain/option";

export type CompanyOption = Option & { children: Option[] };
export type CompanyOptionModelProps = {
    companyValue: string;
    companyLabel: string;
    branchValue: string;
    branchLabel: string;
}
export class CompanyOptionModel extends Model<CompanyOptionModelProps> {
    public get companyValue(): Readonly<string> {
        return this.props.companyValue;
    }

    public get companyLabel(): Readonly<string> {
        return this.props.companyLabel;
    }

    public get branchValue(): Readonly<string> {
        return this.props.branchValue;
    }

    public get branchLabel(): Readonly<string> {
        return this.props.branchLabel;
    }
}