import { Expose } from 'class-transformer'

export class ExamTypeExternalResponseDto {
    @Expose() public readonly typeId: string;
    @Expose() public readonly typeExternalKey: string;
    @Expose() public readonly typeExternalOwner: string;
}