import { FindUserResponseDTO } from "./user.response.dto";
import { Expose, Type } from "class-transformer";

export class FindPatientResponseDTO {
    @Expose()
    public readonly id: number

    @Expose()
    public readonly birthday: Date;

    @Expose()
    public readonly gender: string;

    @Type(() => FindUserResponseDTO)
    @Expose()
    public readonly user: FindUserResponseDTO;
}

export class CreatePatientResponseDTO {
    @Expose()
    public readonly patient: number;
}

export class FindPatientsResponseDTO {
    @Type(() => FindPatientResponseDTO)
    @Expose()
    public readonly patients: FindPatientResponseDTO[];
}

export class FindOnePatientAndUpdateResponseDTO { }