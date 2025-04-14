import { Aggregate, AggregateProps } from "@shared/shared/domain";
import { ApiKey } from "./api-key.domain";
import { Token } from "./token.domain";
import { CreateAuthPayload } from "./payloads/auth.payloads";
import { AuthResourceAddedEvent, AuthApikeyAddedEvent, AuthApikeyRemovedEvent, AuthLogoAddedEvent, AuthPasswordEditedEvent, AuthTokenAddedEvent, AuthTokenRemovedEvent, AuthResourceRemovedEvent } from "./events/auth.events";
import { ApiKeyConflictError, ApiKeyInvalidError, ApiKeyNotFoundError } from "./errors/api_key.errors";
import { AuthResourceConflictError, AuthResourceNotFoundError } from "./errors/auth_resource.errors";
import { TokenNotFoundError } from "./errors/token.errors";

export type AuthProps = AggregateProps & {
    email: string;
    name: string;
    lastname: string;
    password: string;

    apikeys: ApiKey[];
    token: Token | null | undefined;

    resources: string[];
    logo: string | null | undefined;
}
export class Auth extends Aggregate<AuthProps> {
    public get email(): Readonly<string> {
        return this.props.email;
    }

    public get name(): Readonly<string> {
        return this.props.name;
    }

    public get lastname(): Readonly<string> {
        return this.props.lastname;
    }

    public get password(): Readonly<string> {
        return this.props.password;
    }

    public get apikeys(): ReadonlyArray<ApiKey> {
        return this.props.apikeys;
    }

    public get token(): Readonly<Token> | null | undefined {
        return this.props.token;
    }

    public get logo(): Readonly<string> | null | undefined {
        return this.props.logo;
    }

    public get resources(): ReadonlyArray<string> {
        return this.props.resources;
    }

    public static create(payload: CreateAuthPayload): Auth {
        return new Auth({
            ...payload,
            id: crypto.randomUUID(),
            apikeys: [],
            resources: [],
            logo: null,
            token: null
        });
    }

    public static rehydrate(props: AuthProps): Auth {
        const value = new Auth(props);
        value.commit();
        return value;
    }

    private ensureApiKeyUniqueName(name: string): void {
        if (this.props.apikeys.some(e => e.keyName === name)) throw new ApiKeyConflictError(name);
    }

    private ensureResourceUnique(resource: string): void {
        if (this.props.resources.some(e => e === resource)) throw new AuthResourceConflictError(resource);
    }
    
    public updatePassword(password: string): void {
        this.updateProps({ password });
        this.emit(new AuthPasswordEditedEvent({ authId: this.id, password }));
    }

    public addApiKey(name: string): string {
        this.ensureApiKeyUniqueName(name);
        const apikey = ApiKey.create({
            keyName: name,
            authId: this.id
        });

        this.updateProps({ apikeys: [...this.props.apikeys, apikey] });
        this.emit(new AuthApikeyAddedEvent(apikey));
        return apikey.apikey;
    }

    public validateApiKey(apikey: string): void {
        if (!this.props.apikeys.some(e => e.apikey === apikey)) throw new ApiKeyInvalidError();
    }

    public removeApiKey(apikeyId: string): void {
        const newApikeys = this.props.apikeys.filter(e => e.id !== apikeyId);
        if (newApikeys.length === this.props.apikeys.length) throw new ApiKeyNotFoundError(apikeyId);

        this.updateProps({ apikeys: newApikeys });
        this.emit(new AuthApikeyRemovedEvent(apikeyId));
    }

    public addToken(token: string): void {
        if (this.props.token) {
            this.emit(new AuthTokenRemovedEvent(this.props.token.id));
        }
        const newToken = Token.create({ authId: this.id, token: token });
        this.updateProps({ token: newToken });
        this.emit(new AuthTokenAddedEvent(newToken));
    }

    public refreshToken(token: string) {
        if (!this.props.token) {
            this.updateProps({ token: null });
            throw new TokenNotFoundError();
        }
        const newToken = Token.create({ authId: this.id, token: token });
        this.emit(new AuthTokenRemovedEvent(this.props.token.id));
        this.updateProps({ token: newToken });
        this.emit(new AuthTokenAddedEvent(newToken));
    }

    public removeToken(token: string) {
        if (this.props.token?.token !== token) throw new TokenNotFoundError();
        this.emit(new AuthTokenRemovedEvent(this.props.token.id));
        this.updateProps({ token: null });
    }

    public addResource(resourceId: string): void {
        this.ensureResourceUnique(resourceId);
        this.updateProps({ resources: [...this.props.resources, resourceId] });
        this.emit(new AuthResourceAddedEvent({ resourceId: resourceId, authId: this.id }));
    }

    public removeResource(resourceId: string): void {
        const newResource = this.props.resources.filter(e => e !== resourceId);
        if (newResource.length === this.props.resources.length) throw new AuthResourceNotFoundError(resourceId);
        this.updateProps({ resources: newResource });
        this.emit(new AuthResourceRemovedEvent({ resourceId: resourceId, authId: this.id }));
    }

    public addLogo(logoId: string): void {
        this.updateProps({ logo: logoId });
        this.emit(new AuthLogoAddedEvent({ logoId: logoId, authId: this.id }));
    }
}