import { Model } from "@shared/shared/domain/model";

export type ApiKeyModelProps = {
    authId: string;
    apiKeyId: string;
    apiKeyName: string;
}
export class ApiKeyModel extends Model<ApiKeyModelProps> {
    public get authId(): Readonly<string> {
        return this.props.authId;
    }

    public get apiKeyId(): Readonly<string> {
        return this.props.apiKeyId;
    }

    public get apiKeyName(): Readonly<string> {
        return this.props.apiKeyName;
    }
}