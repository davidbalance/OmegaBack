import { Expose, Type } from "class-transformer";

export class FindUserResponseDTO {
    @Expose()
    public readonly id: number;

    @Expose()
    public readonly dni: string;

    @Expose()
    public readonly email: string;

    @Expose()
    public readonly name: string;

    @Expose()
    public readonly lastname: string;
}

export class CreateUserResponseDTO {
    @Expose()
    public readonly user: number;
}

export class FindUsersResponseDTO {
    @Type(() => FindUserResponseDTO)
    @Expose()
    public readonly users: FindUserResponseDTO[];
}

export class FindOneUserAndUpdateResponseDTO { }

export class FindOneUserAndDeleteResponseDTO { }

export class GETAttributeResponseDTO {
    @Expose()
    public readonly id: number;
    @Expose()
    public readonly name: string;
    @Expose()
    public readonly value: string;
}

export class PATCHUserExtraAttributeResponseDTO { }