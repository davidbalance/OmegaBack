import { Model } from "@shared/shared/domain/model";

export type AuthModelProps = {
    authId: string;
    authEmail: string;
    authName: string;
    authLastname: string;
    logo: string | null;
}
export class AuthModel extends Model<AuthModelProps> {
    public get authId(): Readonly<string> {
        return this.props.authId;
    }

    public get authEmail(): Readonly<string> {
        return this.props.authEmail;
    }

    public get authName(): Readonly<string> {
        return this.props.authName;
    }

    public get authLastname(): Readonly<string> {
        return this.props.authLastname;
    }

    public get logo(): Readonly<string> | null {
        return this.props.logo;
    }

}