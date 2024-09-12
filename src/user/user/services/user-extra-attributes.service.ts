import { Inject, Injectable } from "@nestjs/common";
import { UserExtraAttributeRepository } from "../repositories/user-extra-attribute.repository";
import { PostUserExtraAttributeRequestDto } from "../dtos/request/user-attribute.post.dto";
import { UserRepository } from "../repositories/user.repository";
import { UserAttribute } from "../dtos/response/user-attribute.base.dto";

@Injectable()
export class UserExtraAttributeService {
    constructor(
        @Inject(UserRepository) private readonly userRepository: UserRepository,
        @Inject(UserExtraAttributeRepository) private readonly attributeRepository: UserExtraAttributeRepository
    ) { }

    async assignAttribute(id: number, attribute: PostUserExtraAttributeRequestDto): Promise<void> {
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

    async findAttribute(id: number, name: string): Promise<UserAttribute> {
        const foundAttribute = await this.attributeRepository
            .query('attribute')
            .leftJoin('attribute.user', 'user')
            .where('attribute.name = :name', { name: name })
            .andWhere('user.id = :id', { id: id })
            .getOne();
        return foundAttribute;
    }

    async delete(id: number): Promise<void> {
        this.attributeRepository.findOneAndDelete({ id });
    }
}