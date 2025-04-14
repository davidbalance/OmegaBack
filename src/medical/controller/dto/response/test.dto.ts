import { TestFileResultCount } from "@omega/medical/application/queries/test/test-file-result-count.query";
import { Expose } from "class-transformer";

export class DiseaseReportResponseDto {
    @Expose() public readonly diseaseReportId: string;
    @Expose() public readonly diseaseId: string;
    @Expose() public readonly diseaseName: string;
    @Expose() public readonly diseaseGroupId: string;
    @Expose() public readonly diseaseGroupName: string;
    @Expose() public readonly diseaseCommentary: string;
}

export class ReportResponseDto {
    @Expose() public readonly testId: string;
    @Expose() public readonly reportContent: string | null;
}

export class TestResponseDto {
    @Expose() public readonly testId: string;
    @Expose() public readonly testCheck: boolean;
    @Expose() public readonly resultHasFile: boolean;
    @Expose() public readonly reportHasContent: boolean;
    @Expose() public readonly orderId: string;
    @Expose() public readonly examName: string;
    @Expose() public readonly examSubtype: string;
    @Expose() public readonly examType: string;
    @Expose() public readonly diseases: string[];
}

export class TestFileResultCountResponseDto implements TestFileResultCount {
    @Expose() public readonly total: number;
    @Expose() public readonly found: number;
    @Expose() public readonly notFound: number;
}