import { Model } from "@shared/shared/domain/model";

type DiseaseGroupModelProps = {
    groupId: string;
    groupName: string;
    hasDiseases: boolean;
}
export class DiseaseGroupModel extends Model<DiseaseGroupModelProps> {
    public get groupId(): Readonly<string> {
        return this.props.groupId;
    }

    public get groupName(): Readonly<string> {
        return this.props.groupName;
    }

    public get hasDiseases(): Readonly<boolean> {
        return this.props.hasDiseases;
    }
}