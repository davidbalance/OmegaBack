import { Model } from "@shared/shared/domain/model";

export type ApiKeyValueModelProps = {
    authId: string;
    apiKeyValue: string;
    apiKeyName: string;
}
export class ApiKeyValueModel extends Model<ApiKeyValueModelProps> {
    public get authId(): Readonly<string> {
        return this.props.authId;
    }

    public get apiKeyValue(): Readonly<string> {
        return this.props.apiKeyValue;
    }

    public get apiKeyName(): Readonly<string> {
        return this.props.apiKeyName;
    }
}