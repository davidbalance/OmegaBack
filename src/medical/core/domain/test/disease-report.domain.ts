import { Entity, EntityProps } from "@shared/shared/domain";
import { CreateDiseasePayload, UpdateDiseasePayload } from "./payloads/disease.payloads";

type DiseaseReportProps = EntityProps & {
    testId: string;
    diseaseId: string;
    diseaseName: string;
    diseaseGroupId: string;
    diseaseGroupName: string;
    commentary: string;
};
export class DiseaseReport extends Entity<DiseaseReportProps> {

    public get testId(): Readonly<string> {
        return this.props.testId;
    }

    public get diseaseId(): Readonly<string> {
        return this.props.diseaseId;
    }

    public get diseaseName(): Readonly<string> {
        return this.props.diseaseName;
    }

    public get diseaseGroupId(): Readonly<string> {
        return this.props.diseaseGroupId;
    }

    public get diseaseGroupName(): Readonly<string> {
        return this.props.diseaseGroupName;
    }

    public get commentary(): Readonly<string> {
        return this.props.commentary;
    }

    public static create(value: CreateDiseasePayload): DiseaseReport {
        return new DiseaseReport({ id: crypto.randomUUID(), ...value });
    }

    public static rehydrate(props: DiseaseReportProps): DiseaseReport {
        return new DiseaseReport(props);
    }

    public update(value: UpdateDiseasePayload): void {
        this.updateProps(value);
    }
}