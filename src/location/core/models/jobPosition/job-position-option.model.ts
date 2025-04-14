import { Model } from "@shared/shared/domain/model";
import { Option } from "@shared/shared/domain/option";

export type JobPositionOptionModelProps = {
    jobPositionValue: string;
    jobPositionLabel: string;
}
export class JobPositionOptionModel extends Model<JobPositionOptionModelProps> {
    public get jobPositionValue(): Readonly<string> {
        return this.props.jobPositionValue;
    }

    public get jobPositionLabel(): Readonly<string> {
        return this.props.jobPositionLabel;
    }

    public toOption(): Option {
        return {
            label: this.jobPositionLabel,
            value: this.jobPositionValue
        }
    }
}