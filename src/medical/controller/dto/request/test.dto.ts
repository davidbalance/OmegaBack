import { ApiResponseProperty } from "@nestjs/swagger";
import { DiseaseReportCreateCommandPayload } from "@omega/medical/application/commands/test/disease-report-create.command";
import { DiseaseReportEditCommandPayload } from "@omega/medical/application/commands/test/disease-report-edit.command";
import { ReportAddContentCommandPayload } from "@omega/medical/application/commands/test/report-add-content.command";
import { ResultUploadBase64CommandPayload } from "@omega/medical/application/commands/test/result-upload-base64.command";
import { TestCreateCommandPayload } from "@omega/medical/application/commands/test/test-create.command";
import { TestEditExamCommandPayload } from "@omega/medical/application/commands/test/test-edit-exam.command";
import { TestFile, TestGetZipQueryPayload } from "@omega/medical/application/queries/test/test-get-zip.query";
import { Type } from "class-transformer";
import { IsArray, IsBase64, IsEnum, IsNotEmpty, IsString, IsUUID } from "class-validator";

export class DiseaseReportCreateRequestDto implements DiseaseReportCreateCommandPayload {
    @IsUUID()
    public readonly testId: string;

    @IsUUID()
    public readonly diseaseId: string;

    @IsString()
    @IsNotEmpty()
    public readonly diseaseName: string;

    @IsUUID()
    public readonly diseaseGroupId: string;

    @IsString()
    @IsNotEmpty()
    public readonly diseaseGroupName: string;

    @IsString()
    @IsNotEmpty()
    public readonly commentary: string;
}

export class DiseaseReportEditRequestDto implements Omit<DiseaseReportEditCommandPayload, 'testId' | 'diseaseReportId'> {
    @IsUUID()
    public readonly diseaseId: string;

    @IsString()
    @IsNotEmpty()
    public readonly diseaseName: string;

    @IsUUID()
    public readonly diseaseGroupId: string;

    @IsString()
    @IsNotEmpty()
    public readonly diseaseGroupName: string;

    @IsString()
    @IsNotEmpty()
    public readonly commentary: string;
}

export class ReportRequestDto implements Omit<ReportAddContentCommandPayload, 'testId'> {
    @IsString()
    @IsNotEmpty()
    public readonly content: string;
}

export class ResultUploadBase64RequestDto implements Omit<ResultUploadBase64CommandPayload, 'testId'> {
    @IsBase64()
    @IsNotEmpty()
    public readonly base64: string;
}

export class TestCreateRequestDto implements TestCreateCommandPayload {
    @IsUUID()
    public readonly orderId: string;

    @IsString()
    @IsNotEmpty()
    public readonly examName: string;

    @IsString()
    @IsNotEmpty()
    public readonly examSubtype: string;

    @IsString()
    @IsNotEmpty()
    public readonly examType: string;
}

export class TestEditExamRequestDto implements Omit<TestEditExamCommandPayload, 'testId'> {
    @IsString()
    @IsNotEmpty()
    public readonly examName: string;

    @IsString()
    @IsNotEmpty()
    public readonly examSubtype: string;

    @IsString()
    @IsNotEmpty()
    public readonly examType: string;
}

class TestFileRequestDto implements TestFile {
    @IsString()
    @IsNotEmpty()
    public readonly testId: string;

    @IsString()
    @IsNotEmpty()
    public readonly examName: string;

    @IsEnum({ result: 'result', report: 'report' })
    public readonly fileType: "result" | "report";
}

export class TestZipRequestDto implements TestGetZipQueryPayload {
    @Type(() => TestFileRequestDto)
    @IsArray()
    public readonly values: TestFile[];
}