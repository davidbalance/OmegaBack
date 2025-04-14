import { UserAddAttributeCommandPayload } from "@omega/profile/application/command/user/user-add-attribute.command";
import { IsNotEmpty, IsString, IsUUID } from "class-validator";

export class UserAddAttributeRequestDto implements UserAddAttributeCommandPayload {
    @IsUUID()
    public readonly userId: string;

    @IsString()
    @IsNotEmpty()
    public readonly attributeName: string;

    @IsString()
    @IsNotEmpty()
    public readonly attributeValue: string;
}