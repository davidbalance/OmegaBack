import { Expose } from 'class-transformer'

export class CorporativeExternalResponseDto {
    @Expose() public readonly corporativeId: string;
    @Expose() public readonly corporativeExternalKey: string;
    @Expose() public readonly corporativeExternalOwner: string;
}