import { Model } from "@shared/shared/domain/model";

export type ClientAreaModelProps = {
    patientDni: string;
    areaId: string | null | undefined;
    areaName: string | null | undefined;
}
export class ClientAreaModel extends Model<ClientAreaModelProps> {
    public get patientDni(): Readonly<string> {
        return this.props.patientDni;
    }

    public get areaId(): Readonly<string> | null | undefined {
        return this.props.areaId;
    }

    public get areaName(): Readonly<string> | null | undefined {
        return this.props.areaName;
    }
}