import { EntityProps, Entity } from "@shared/shared/domain";

export type EmailProps = EntityProps & {
    clientId: string;
    email: string;
    default: boolean;
};
export class Email extends Entity<EmailProps> {

    public get clientId(): Readonly<string> {
        return this.props.clientId;
    }

    public get email(): Readonly<string> {
        return this.props.email;
    }

    public get default(): Readonly<boolean> {
        return this.props.default;
    }

    public static create(value: Omit<EmailProps, 'id'>): Email {
        return new Email({
            id: crypto.randomUUID(),
            ...value
        });
    }

    public static rehydrate(props: EmailProps): Email {
        return new Email(props);
    }

    public addDefault(): void {
        this.updateProps({ default: true });
    }

    public removeDefault(): void {
        this.updateProps({ default: false });
    }
}