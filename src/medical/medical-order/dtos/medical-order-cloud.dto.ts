import { Expose, Type } from "class-transformer";

export class MedicalOrderFile {
    @Expose() public readonly id: number;

    @Expose() public readonly examName: string;

    @Expose() public readonly type: 'result' | 'report';

    @Expose() public readonly hasFile: boolean;
}

export class MedicalOrderCloud {
    @Expose() public readonly dni: string;

    @Expose() public readonly fullname: string;

    @Type(() => MedicalOrderFile)
    @Expose() public readonly fileResults: MedicalOrderFile[];

    @Type(() => MedicalOrderFile)
    @Expose() public readonly fileReports: MedicalOrderFile[];
}

export class MedicalOrderCloudResponse extends MedicalOrderCloud { }