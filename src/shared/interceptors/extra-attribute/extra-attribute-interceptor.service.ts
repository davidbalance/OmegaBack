import { UserService } from "@/user/user/user.service";
import { Inject, Injectable, NotFoundException } from "@nestjs/common";

@Injectable()
export class ExtraAttributeInterceptorService {
    constructor(
        @Inject(UserService) private readonly userService: UserService
    ) { }

    async getExtraAttribute(id: number, attributeName: string): Promise<string> {
        const user = await this.userService.findOne(id);
        const index = user.extraAttributes.findIndex(e => e.name === attributeName);
        if (index > 0) {
            throw new NotFoundException('Not found attribute');
        }
        return user.extraAttributes[index].value;
    }
} 