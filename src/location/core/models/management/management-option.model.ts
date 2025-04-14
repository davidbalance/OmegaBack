import { Model } from "@shared/shared/domain/model";
import { Option } from "@shared/shared/domain/option";

export type ManagementOptionModelProps = {
    managementValue: string;
    managementLabel: string;
}
export class ManagementOptionModel extends Model<ManagementOptionModelProps> {
    public get managementValue(): Readonly<string> {
        return this.props.managementValue;
    }

    public get managementLabel(): Readonly<string> {
        return this.props.managementLabel;
    }

    public toOption(): Option {
        return {
            label: this.managementLabel,
            value: this.managementValue
        }
    }
}