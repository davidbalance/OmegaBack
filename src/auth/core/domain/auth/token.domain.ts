import { Entity, EntityProps } from "@shared/shared/domain";
import { CreateTokenPayload } from "./payloads/token.payloads";

export type TokenProps = EntityProps & {
    token: string;
    authId: string;
}
export class Token extends Entity<TokenProps> {
    public get token(): Readonly<string> {
        return this.props.token;
    }

    public get authId(): Readonly<string> {
        return this.props.authId;
    }

    public static create(value: CreateTokenPayload): Token {
        return new Token({
            ...value,
            id: crypto.randomUUID()
        });
    }

    public static rehydrate(value: TokenProps): Token {
        return new Token(value);
    }

    public validate(token: string): boolean {
        return token === this.props.token;
    }
}