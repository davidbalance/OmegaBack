import { Inject } from "@nestjs/common";

export const CreateManyTestFromExternalSourceServiceToken = 'CreateManyTestFromExternalSourceService';
export const CreatePatientFromExternalSourceServiceToken = 'CreatePatientFromExternalSourceService';
export const CreateOrderFromExternalSourceServiceToken = 'CreateOrderFromExternalSourceService';
export const CreateTestFromExternalSourceServiceToken = 'CreateTestFromExternalSourceService';

const service = {
    CreateManyTestFromExternalSource: CreateManyTestFromExternalSourceServiceToken,
    CreatePatientFromExternalSource: CreatePatientFromExternalSourceServiceToken,
    CreateOrderFromExternalSource: CreateOrderFromExternalSourceServiceToken,
    CreateTestFromExternalSource: CreateTestFromExternalSourceServiceToken,
}

export const InjectService = (token: keyof typeof service) => Inject(service[token]);