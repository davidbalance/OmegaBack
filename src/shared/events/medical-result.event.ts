export const MedicalResultEvent = {
    ON_UPLOAD_FILE: 'medical-result.upload'
}

export class OnMedicalResultUploadFileEvent {
    constructor(
        public readonly id: number
    ) { }
}