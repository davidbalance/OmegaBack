import { Model } from "@shared/shared/domain/model";

export type AuthResourceModelProps = {
    authId: string;
    resourceId: string;
    resourceLabel: string;
    resourceAddress: string;
    resourceIcon: string;
}
export class AuthResourceModel extends Model<AuthResourceModelProps> {
    public get authId(): Readonly<string> {
        return this.props.authId;
    }
    
    public get resourceId(): Readonly<string> {
        return this.props.resourceId;
    }

    public get resourceLabel(): Readonly<string> {
        return this.props.resourceLabel;
    }

    public get resourceAddress(): Readonly<string> {
        return this.props.resourceAddress;
    }

    public get resourceIcon(): Readonly<string> {
        return this.props.resourceIcon;
    }
}