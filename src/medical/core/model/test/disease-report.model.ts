import { Model } from "@shared/shared/domain/model";

export type DiseaseReportModelProps = {
    diseaseReportId: string,
    testId: string,
    diseaseId: string,
    diseaseName: string,
    diseaseGroupId: string,
    diseaseGroupName: string,
    diseaseCommentary: string,
}
export class DiseaseReportModel extends Model<DiseaseReportModelProps> {
    public get diseaseReportId(): string {
        return this.props.diseaseReportId;
    }

    public get testId(): string {
        return this.props.testId;
    }

    public get diseaseId(): string {
        return this.props.diseaseId;
    }

    public get diseaseName(): string {
        return this.props.diseaseName;
    }

    public get diseaseGroupId(): string {
        return this.props.diseaseGroupId;
    }

    public get diseaseGroupName(): string {
        return this.props.diseaseGroupName;
    }

    public get diseaseCommentary(): string {
        return this.props.diseaseCommentary;
    }
}