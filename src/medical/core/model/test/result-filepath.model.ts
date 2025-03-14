import { Model } from "@shared/shared/domain/model";

export type ResultFilepathModelProps = {
    testId: string;
    orderYear: number;
    locationCorporative: string;
    locationCompany: string;
    locationBranch: string;
    patient: string;
    order: string;
    exam: string;
}

export class ResultFilepathModel extends Model<ResultFilepathModelProps> {

    public get testId(): string {
        return this.props.testId;
    }

    public get path(): Readonly<string> {
        return `${this.filepath}/${this.filename}`;
    }

    public get filepath(): Readonly<string> {
        const path = `${this.props.orderYear}/${this.props.locationCorporative}/${this.props.locationCompany}/${this.props.locationBranch}/${this.props.patient}/${this.props.order}`;
        return `medical_file/${path}`;
    }

    public get filename(): Readonly<string> {
        const filename = this.props.exam.toLocaleLowerCase().replaceAll(/\s/ig, '_');
        return `${filename}.pdf`
    }

    public get orderYear(): Readonly<number> {
        return this.props.orderYear;
    }

    public get locationCorporative(): Readonly<string> {
        return this.props.locationCorporative;
    }

    public get locationCompany(): Readonly<string> {
        return this.props.locationCompany;
    }

    public get locationBranch(): Readonly<string> {
        return this.props.locationBranch;
    }

    public get patient(): Readonly<string> {
        return this.props.patient;
    }

    public get order(): Readonly<string> {
        return this.props.order;
    }

    public get exam(): Readonly<string> {
        return this.props.exam;
    }
}