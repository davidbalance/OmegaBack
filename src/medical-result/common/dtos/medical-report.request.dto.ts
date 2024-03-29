export class CreateMedicalReportValueRequestDTO {
    public readonly name: string;
    public readonly content: string;
}


export class CreateMedicalReportRequestDTO {
    public readonly doctorDni: string;
    public readonly doctorName: string;
    public readonly doctorLastname: string;
    public readonly doctorSignature: string;
    public readonly values: CreateMedicalReportValueRequestDTO[];
}