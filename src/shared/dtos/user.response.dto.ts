import { User } from "@/user/user/entities/user.entity";

export class CreateUserResponseDTO { }

export class FindUserResponseDTO {
    public readonly users: User[]
}

export class FindOneUserResponseDTO {
    public readonly user: User
}

export class UpdateUserResponseDTO { }

export class FindOneAndInactiveUserResponseDTO { }