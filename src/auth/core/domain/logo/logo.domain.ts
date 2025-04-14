import { AggregateProps, Aggregate } from "@shared/shared/domain";
import { CreateLogoPayload } from "./payloads/logo.payload";

export type LogoProps = AggregateProps & {
    name: string;
}
export class Logo extends Aggregate<LogoProps> {
    public get name(): Readonly<string> {
        return this.props.name;
    }

    public static create(payload: CreateLogoPayload): Logo {
        return new Logo({
            ...payload,
            id: crypto.randomUUID()
        });
    }

    public static rehydrate(props: LogoProps): Logo {
        return new Logo(props);
    }

}