import { Model } from "@shared/shared/domain/model";

export type ClientManagementModelProps = {
    patientDni: string;
    managementId: string | null | undefined;
    managementName: string | null | undefined;
}
export class ClientManagementModel extends Model<ClientManagementModelProps> {
    public get patientDni(): Readonly<string> {
        return this.props.patientDni;
    }

    public get managementId(): Readonly<string> | null | undefined {
        return this.props.managementId;
    }

    public get managementName(): Readonly<string> | null | undefined {
        return this.props.managementName;
    }
}