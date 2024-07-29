import { UserManagementService } from "@/user/user/services/user-management.service";
import { Inject, Injectable } from "@nestjs/common";

@Injectable()
export class DataInterceptorService {
    constructor(
        @Inject(UserManagementService) private readonly userService: UserManagementService
    ) { }

    async getDni(id: number): Promise<string> {
        const user = await this.userService.findOne(id);
        return user.dni;
    }


}