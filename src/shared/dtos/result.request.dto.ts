import { CreateOrderRequestDTO } from "./order.request.dto";
import { CreateUserRequestDTO } from "./user.request.dto";

export class CreateResultRequestDTO {
    public readonly user: CreateUserRequestDTO;
    public readonly order: CreateOrderRequestDTO;
}

export class UpdateResultRequestDTO { }

export class FindOneOrInsertResultRequestDTO { }