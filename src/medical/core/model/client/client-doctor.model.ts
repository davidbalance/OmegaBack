import { ClientModel, ClientModelProps } from "./client.model";

export class ClientDoctorModel extends ClientModel {

    private readonly _doctorDni: string;

    public get doctorDni(): string {
        return this._doctorDni;
    }

    constructor(props: ClientModelProps & { doctorDni: string }) {
        super(props);
        this._doctorDni = props.doctorDni;
    }
}