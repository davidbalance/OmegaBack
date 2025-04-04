import { Model } from "@shared/shared/domain/model";

export type TestExternalConnectionModelProps = {
    testId: string;
    testExternalKey: string;
    testExternalOwner: string;
}
export class TestExternalConnectionModel extends Model<TestExternalConnectionModelProps> {
    public get testId(): Readonly<string> {
        return this.props.testId;
    }

    public get testExternalKey(): Readonly<string> {
        return this.props.testExternalKey;
    }

    public get testExternalOwner(): Readonly<string> {
        return this.props.testExternalOwner;
    }
}