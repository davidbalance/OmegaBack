import { Expose, Type } from "class-transformer";

export class FlatEEQPatient {
    @Expose()
    public readonly id: number;

    @Expose()
    public readonly birthday: Date;

    @Expose()
    public readonly gender: string;

    @Expose()
    public readonly dni: string;

    @Expose()
    public readonly email: string;

    @Expose()
    public readonly name: string;

    @Expose()
    public readonly lastname: string;

    @Expose()
    public readonly role: string;

    @Expose()
    public readonly user: number;
}

export class GETEEQPatientResponseDto extends FlatEEQPatient { }

export class GETEEQPatientArrayResponseDto {
    @Type(() => GETEEQPatientResponseDto)
    @Expose()
    public readonly patients: GETEEQPatientResponseDto[];
}

export class GETEEQPatientArrayWithPageCountResponseDto extends GETEEQPatientArrayResponseDto {
    @Expose()
    public readonly pages: number;
}