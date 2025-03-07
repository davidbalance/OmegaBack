import { Expose } from 'class-transformer'

export class ExamResponseDto {
    @Expose() public readonly examId: string;
    @Expose() public readonly examName: string;
    @Expose() public readonly subtypeId: string;
}