import { Model } from "@shared/shared/domain/model";

export type DiseaseModelProps = {
    diseaseId: string;
    diseaseName: string;
    groupId: string;
}
export class DiseaseModel extends Model<DiseaseModelProps> {
    public get groupId(): Readonly<string> {
        return this.props.groupId;
    }

    public get diseaseId(): Readonly<string> {
        return this.props.diseaseId;
    }

    public get diseaseName(): Readonly<string> {
        return this.props.diseaseName;
    }
}