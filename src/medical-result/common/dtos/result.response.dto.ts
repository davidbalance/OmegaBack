export class FindResult {
    public readonly id: number;
    public readonly examName: string;
    public readonly address: string;
    public readonly disease?: number;
    public readonly report?: {
        id: number,
        content: string;
    }
}

export class FindResultsByDoctorResponseDTO {
    public readonly results: FindResult[];
}

export class InsertMedicalReportResponseDTO {
    public readonly result: FindResult;
}

export class FindOneResultAndUpdateDiseaseResponseDTO {}
