import { Model } from "@shared/shared/domain/model";
import { Option } from "@shared/shared/domain/option";

type DoctorOptionModelProps = {
    doctorValue: string;
    doctorLabel: string;
}
export class DoctorOptionModel extends Model<DoctorOptionModelProps> {
    public get doctorValue(): Readonly<string> {
        return this.props.doctorValue;
    }
    public get doctorLabel(): Readonly<string> {
        return this.props.doctorLabel;
    }

    public toDomain(): Option {
        return {
            label: this.doctorLabel,
            value: this.doctorValue
        }
    }
}