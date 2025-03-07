export type ExamPayload = {
    examName: string;
    examSubtype: string;
    examType: string;
}

export type CreateTestPayload = ExamPayload & {
    orderId: string;
}

export type CreateDiseaseReportPayload = {
    diseaseId: string;
    diseaseName: string;
    diseaseGroupId: string;
    diseaseGroupName: string;
    commentary: string;
}

export type UpdateDiseaseReportPayload = CreateDiseaseReportPayload & {
    id: string;
}