import { Model } from "@shared/shared/domain/model";

export type TestInnerModelProps = {
    testId: string;
    orderId: string;
    examName: string;
    examSubtype: string;
    examType: string;
}

export class TestInnerModel extends Model<TestInnerModelProps> {

    public get testId(): Readonly<string> {
        return this.props.testId;
    }

    public get orderId(): Readonly<string> {
        return this.props.orderId;
    }

    public get examType(): Readonly<string> {
        return this.props.examType;
    }

    public get examSubtype(): Readonly<string> {
        return this.props.examSubtype;
    }

    public get examName(): Readonly<string> {
        return this.props.examName;
    }
}