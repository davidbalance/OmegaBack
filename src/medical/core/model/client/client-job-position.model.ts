import { Model } from "@shared/shared/domain/model";

export type ClientJobPositionModelProps = {
    patientDni: string;
    jobPosition: string | null | undefined;
}
export class ClientJobPositionModel extends Model<ClientJobPositionModelProps> {
    public get patientDni(): Readonly<string> {
        return this.props.patientDni;
    }

    public get jobPosition(): Readonly<string> | null | undefined {
        return this.props.jobPosition;
    }
}