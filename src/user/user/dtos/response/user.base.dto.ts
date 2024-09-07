import { Expose } from "class-transformer";

export class User {
    @Expose() public readonly id: number;
    @Expose() public readonly dni: string;
    @Expose() public readonly email: string;
    @Expose() public readonly name: string;
    @Expose() public readonly lastname: string;
    @Expose() public readonly hasCredential: boolean;
}
