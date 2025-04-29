import { Option } from '@shared/shared/domain/option';
import { PaginationResponse } from '@shared/shared/nest/pagination-response';
import { Expose, Type } from 'class-transformer'

export class DoctorResponseDto {
    @Expose() public readonly userId: string;
    @Expose() public readonly userDni: string;
    @Expose() public readonly userEmail: string;
    @Expose() public readonly userName: string;
    @Expose() public readonly userLastname: string;
    @Expose() public readonly userHasAuth: boolean;
    @Expose() public readonly doctorSignature: string;
    @Expose() public readonly doctorHasFile: boolean;
}

export class DoctorManyResponseDto implements PaginationResponse<DoctorResponseDto> {
    @Type(() => DoctorResponseDto)
    @Expose() public readonly data: DoctorResponseDto[];
    @Expose() public readonly amount: number;
}

export class DoctorOptionResponseDto implements Option {
    @Expose() public readonly value: string;
    @Expose() public readonly label: string;
}