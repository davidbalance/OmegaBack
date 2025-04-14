import { Model } from "@shared/shared/domain/model";

export type ResourceModelProps = {
    resourceId: string;
    resourceLabel: string;
    resourceAddress: string;
    resourceOrder: number;
    resourceIcon: string;
}
export class ResourceModel extends Model<ResourceModelProps> {
    public get resourceId(): Readonly<string> {
        return this.props.resourceId;
    }

    public get resourceLabel(): Readonly<string> {
        return this.props.resourceLabel;
    }

    public get resourceAddress(): Readonly<string> {
        return this.props.resourceAddress;
    }

    public get resourceOrder(): Readonly<number> {
        return this.props.resourceOrder;
    }

    public get resourceIcon(): Readonly<string> {
        return this.props.resourceIcon;
    }
}