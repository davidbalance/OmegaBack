import { ExternalKey, ExternalKeyProps } from "@shared/shared/domain/external-key.value-object";
import { CreateTestExternalKeyPayload } from "../payloads/test-external-key.payloads";

export type TestExternalKeyProps = ExternalKeyProps & {
    testId: string;
};
export class TestExternalKey extends ExternalKey {
    private readonly _testId: string;

    public get testId(): Readonly<string> {
        return this._testId;
    }

    public constructor(props: TestExternalKeyProps) {
        super(props);
        this._testId = props.testId;
    }

    public static create(value: CreateTestExternalKeyPayload): TestExternalKey {
        return new TestExternalKey(value);
    }
}