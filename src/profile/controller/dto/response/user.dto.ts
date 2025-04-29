import { PaginationResponse } from '@shared/shared/nest/pagination-response';
import { AuthResource } from '@shared/shared/providers/auth.provider';
import { Expose, Type } from 'class-transformer'

export class UserResponseDto {
    @Expose() public readonly userId: string;
    @Expose() public readonly userName: string;
    @Expose() public readonly userLastname: string;
    @Expose() public readonly userEmail: string;
    @Expose() public readonly userDni: string;
}

export class UserManyResponseDto implements PaginationResponse<UserResponseDto> {
    @Type(() => UserResponseDto)
    @Expose() public readonly data: UserResponseDto[];
    @Expose() public readonly amount: number;
}

export class UserAuthResourceResponseDto implements AuthResource {
    @Expose() public readonly resourceId: string;
    @Expose() public readonly resourceLabel: string;
    @Expose() public readonly resourceIcon?: string | undefined;
}