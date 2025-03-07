import { Model } from "@shared/shared/domain/model";
import { Option } from "@shared/shared/domain/option";

type AreaOptionModelProps = {
    areaValue: string;
    areaLabel: string;
}
export class AreaOptionModel extends Model<AreaOptionModelProps> {
    public get areaValue(): Readonly<string> {
        return this.props.areaValue;
    }

    public get areaLabel(): Readonly<string> {
        return this.props.areaLabel;
    }

    public toOption(): Option {
        return {
            label: this.areaLabel,
            value: this.areaValue
        }
    }
}