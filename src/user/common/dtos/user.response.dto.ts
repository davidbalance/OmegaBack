import { SelectorOption } from "@/shared";
import { User } from "@/user/user/entities/user.entity";

export class FindUserBase implements Omit<User, 'createAt' | 'updateAt' | 'status' | 'hasCredential'>{
    public readonly id: number;
    public readonly dni: string;
    public readonly email: string;
    public readonly name: string;
    public readonly lastname: string;
}

export class CreateUserResponseDTO {
    public readonly user: number;
}

export class FindUsersResponseDTO {
    public readonly users: FindUserBase[];
}

export class FindUserResponseDTO {
    public readonly user: FindUserBase;
}

export class FindOneUserAndUpdateResponseDTO { }

export class FindOneUserAndDeleteResponseDTO { }