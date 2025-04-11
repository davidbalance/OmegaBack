import { Expose } from 'class-transformer'

export class ExamSubtypeExternalResponseDto {
    @Expose() public readonly subtypeId: string;
    @Expose() public readonly subtypeExternalKey: string;
    @Expose() public readonly subtypeExternalOwner: string;
    @Expose() public readonly typeId: string;
}