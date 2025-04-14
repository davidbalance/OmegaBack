import { Model } from "@shared/shared/domain/model";
import { Option } from "@shared/shared/domain/option";

export type DiseaseGroupOption = Option & { children: Option[] }
export type DiseaseGroupOptionModelProps = {
    groupValue: string;
    groupLabel: string;
    diseaseValue: string;
    diseaseLabel: string;
}
export class DiseaseGroupOptionModel extends Model<DiseaseGroupOptionModelProps> {
    public get groupValue(): Readonly<string> {
        return this.props.groupValue;
    }

    public get groupLabel(): Readonly<string> {
        return this.props.groupLabel;
    }

    public get diseaseValue(): Readonly<string> {
        return this.props.diseaseValue;
    }

    public get diseaseLabel(): Readonly<string> {
        return this.props.diseaseLabel;
    }
}