import { Model } from "@shared/shared/domain/model";

export type TestFileResultModelProps = {
    testId: string;
    patientName: string;
    patientLastname: string;
    patientDni: string;
    examName: string;
    resultFilepath: string;
    resultHasFile: boolean;
}

export class TestFileResultModel extends Model<TestFileResultModelProps> {
    public get testId(): Readonly<string> {
        return this.props.testId;
    }

    public get patientName(): Readonly<string> {
        return this.props.patientName;
    }

    public get patientLastname(): Readonly<string> {
        return this.props.patientLastname;
    }

    public get patientDni(): Readonly<string> {
        return this.props.patientDni;
    }

    public get examName(): Readonly<string> {
        return this.props.examName;
    }

    public get resultFilepath(): Readonly<string> {
        return this.props.resultFilepath;
    }

    public get resultHasFile(): Readonly<boolean> {
        return this.props.resultHasFile;
    }
}