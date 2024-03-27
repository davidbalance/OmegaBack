import { User } from "@/user/user/entities/user.entity";

export class CreateUserResponseDTO {
    public readonly user: number;
}

export class FindUserResponseDTO {
    public readonly users: User[];
    public readonly amount: number;
}

export class FindOneUserResponseDTO {
    public readonly user: User
}

export class UpdateUserResponseDTO { }

export class FindOneAndInactiveUserResponseDTO { }