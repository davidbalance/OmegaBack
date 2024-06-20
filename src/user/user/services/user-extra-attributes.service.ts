import { Inject, Injectable } from "@nestjs/common";
import { UserExtraAttributeRepository } from "../repositories/user-extra-attribute.repository";
import { UserExtraAttribute } from "../entities/user-extra-attribute";

@Injectable()
export class UserExtraAttributeService {
    constructor(@Inject(UserExtraAttributeRepository) private readonly repository: UserExtraAttributeRepository) { }

    async create(name: string, value: string): Promise<UserExtraAttribute> {
        const extraAttribute = this.repository.create({ name, value });
        return extraAttribute;
    }

    async update(id: number, value: string): Promise<UserExtraAttribute> {
        const extraAttribute = this.repository.findOneAndUpdate({ id }, { value });
        return extraAttribute;
    }

    async delete(id: number): Promise<void> {
        this.repository.findOneAndDelete({ id });
    }
}