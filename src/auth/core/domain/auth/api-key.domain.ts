import { Entity, EntityProps } from "@shared/shared/domain";
import { CreateApiKeyPayload } from "./payloads/api-key.payloads";

export type ApiKeyProps = EntityProps & {
    apikey: string;
    keyName: string;
    authId: string;
}
export class ApiKey extends Entity<ApiKeyProps> {
    public get apikey(): Readonly<string> {
        return this.props.apikey;
    }

    public get keyName(): Readonly<string> {
        return this.props.keyName;
    }

    public get authId(): Readonly<string> {
        return this.props.authId;
    }

    public static create(payload: CreateApiKeyPayload): ApiKey {
        const apiKey = new ApiKey({
            ...payload,
            id: crypto.randomUUID(),
            apikey: crypto.randomUUID()
        });

        return apiKey;
    }

    public static rehydrate(value: ApiKeyProps): ApiKey {
        return new ApiKey(value);
    }

    public validate(key: string): boolean {
        return key === this.props.apikey;
    }
}