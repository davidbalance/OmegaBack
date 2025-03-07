import { Model } from "@shared/shared/domain/model";

export type LogoModelProps = {
    logoId: string;
    logoName: string;
}
export class LogoModel extends Model<LogoModelProps> {
    public get logoId(): Readonly<string> {
        return this.props.logoId;
    }

    public get logoName(): Readonly<string> {
        return this.props.logoName;
    }
}