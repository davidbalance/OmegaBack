export type CreateClientPayload = {
    patientDni: string;
    patientName: string;
    patientLastname: string;
    patientGender: 'male' | 'female';
    patientRole?: string;
    patientBirthday: Date;
}

export type EditClientPayload = Partial<Omit<CreateClientPayload, 'dni'>>;

export type AddManagementPayload = {
    managementId: string;
    managementName: string;
}

export type AddAreaPayload = {
    areaId: string;
    areaName: string;
}

export type AddJobPositionPayload = {
    jobPositionName: string;
}

export type AddRecordPayload = {
    name: string;
    metadata: any
}

export type UpdateRecordMetadataPayload = {
    recordId: string;
    metadata: any
}

export type UpdateRecordFilepathPayload = {
    recordId: string;
    filepath: string;
}