import { Inject, Injectable } from "@nestjs/common";
import { UserExtraAttributeRepository } from "../repositories/user-extra-attribute.repository";
import { UserExtraAttribute } from "../entities/user-extra-attribute.entity";
import { POSTUserExtraAttributeRequestDto } from "../dtos/post.user-extra-attribute.dto";
import { UserRepository } from "../repositories/user.repository";

@Injectable()
export class UserExtraAttributeService {
    constructor(
        @Inject(UserRepository) private readonly userRepository: UserRepository,
        @Inject(UserExtraAttributeRepository) private readonly attributeRepository: UserExtraAttributeRepository
    ) { }

    async assignAttribute(id: number, attribute: POSTUserExtraAttributeRequestDto): Promise<void> {
        const user = await this.userRepository.findOne({
            where: { id },
            relations: { extraAttributes: true }
        });
        const selectedAttribute = user.extraAttributes.find((e) => e.name === attribute.name);
        if (selectedAttribute) {
            await this.attributeRepository.findOneAndUpdate({ id: selectedAttribute.id }, { value: attribute.value });
        } else {
            await this.attributeRepository.create({ ...attribute, user: user });
        }
    }

    async findUserAttribute(id: number, name: string): Promise<UserExtraAttribute> {
        const foundAttribute = await this.attributeRepository
            .query('attribute')
            .leftJoin('attribute.user', 'user', 'user.id = :id', { id: id })
            .where('attribute = :name', { name: name })
            .getOne();
        return foundAttribute;
    }

    async delete(id: number): Promise<void> {
        this.attributeRepository.findOneAndDelete({ id });
    }
}