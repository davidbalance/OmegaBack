import { Model } from "@shared/shared/domain/model";

export type ManagementModelProps = {
    managementId: string;
    managementName: string;
}
export class ManagementModel extends Model<ManagementModelProps> {
    public get managementId(): Readonly<string> {
        return this.props.managementId;
    }

    public get managementName(): Readonly<string> {
        return this.props.managementName;
    }
}