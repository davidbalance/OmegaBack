import { Model } from "@shared/shared/domain/model";

type UserModelProps = {
    userId: string;
    userName: string;
    userLastname: string;
    userDni: string;
    userEmail: string;
    authId: string;
}
export class UserModel extends Model<UserModelProps> {
    public get userId(): Readonly<string> {
        return this.props.userId;
    }

    public get userName(): Readonly<string> {
        return this.props.userName;
    }

    public get userLastname(): Readonly<string> {
        return this.props.userLastname;
    }

    public get userEmail(): Readonly<string> {
        return this.props.userEmail;
    }

    public get userDni(): Readonly<string> {
        return this.props.userDni;
    }

    public get authId(): Readonly<string> {
        return this.props.authId;
    }
}