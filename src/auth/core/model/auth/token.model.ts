import { Model } from "@shared/shared/domain/model";

export type TokenModelProps = {
    authId: string;
    token: string;
}
export class TokenModel extends Model<TokenModelProps> {
    public get authId(): Readonly<string> {
        return this.props.authId;
    }

    public get token(): Readonly<string> {
        return this.props.token;
    }
}