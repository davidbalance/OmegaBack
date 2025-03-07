import { Model } from "@shared/shared/domain/model";

type AreaModelProps = {
    areaId: string;
    areaName: string;
}
export class AreaModel extends Model<AreaModelProps> {
    public get areaId(): Readonly<string> {
        return this.props.areaId;
    }

    public get areaName(): Readonly<string> {
        return this.props.areaName;
    }
}