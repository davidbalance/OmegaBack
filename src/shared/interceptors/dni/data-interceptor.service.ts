import { UserService } from "@/user/user/user.service";
import { Inject, Injectable } from "@nestjs/common";

@Injectable()
export class DataInterceptorService {
    constructor(
        @Inject(UserService) private readonly userService: UserService
    ) { }

    async getDni(id: number): Promise<string> {
        const user = await this.userService.findOne(id);
        return user.dni;
    }
    

}