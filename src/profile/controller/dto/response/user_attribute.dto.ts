import { Expose } from 'class-transformer'

export class UserAttributeResponseDto {
    @Expose() public readonly attributeId: string;
    @Expose() public readonly attributeName: string;
    @Expose() public readonly attributeValue: string;
    @Expose() public readonly userId: string;
}