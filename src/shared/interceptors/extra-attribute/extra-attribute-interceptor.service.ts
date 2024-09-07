import { UserExtraAttributeService } from "@/user/user/services/user-extra-attributes.service";
import { Inject, Injectable, NotFoundException } from "@nestjs/common";

@Injectable()
export class ExtraAttributeInterceptorService {
    constructor(
        @Inject(UserExtraAttributeService) private readonly userService: UserExtraAttributeService
    ) { }

    async getExtraAttribute(id: number, name: string): Promise<string> {
        const attribute = await this.userService.findAttribute(id, name);
        if (!attribute) {
            throw new NotFoundException('Not found attribute');
        }
        return attribute.value;
    }
} 