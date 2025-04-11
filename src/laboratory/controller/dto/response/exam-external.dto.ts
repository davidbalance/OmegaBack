import { Expose } from 'class-transformer'

export class ExamExternalResponseDto {
    @Expose() public readonly examId: string;
    @Expose() public readonly examExternalKey: string;
    @Expose() public readonly examExternalOwner: string;
    @Expose() public readonly subtypeId: string;
}