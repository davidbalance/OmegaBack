import { FindOneOrCreate } from "../interfaces";
import { FindOneOrCreateBranchRequestDTO } from "./branch.request.dto";
import { FindOneOrCreateCompanyRequestDTO } from "./company.request.dto";
import { FindOneOrCreateCorporativeGroupRequestDTO } from "./corporative-group.request.dto";
import { FindOneOrCreateUserRequestDTO } from "./user.request.dto";

export class CreateOrderRequestDTO {
    public readonly corporativeGroup: number;
    public readonly company: string;
    public readonly branch: number;
    public readonly patient: string;
    public readonly key: number;
}

export class FindOneOrCreateOrderRequestDTO {
    public lookup: number;
    public corporativeGroup: FindOneOrCreateCorporativeGroupRequestDTO;
    public company: FindOneOrCreateCompanyRequestDTO;
    public branch: FindOneOrCreateBranchRequestDTO;
    public patient: FindOneOrCreateUserRequestDTO;
}