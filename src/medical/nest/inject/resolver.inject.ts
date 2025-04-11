import { Inject } from "@nestjs/common";

export const PatientExternalSourceResolverToken = 'PatientExternalSourceResolver';
export const OrderExternalSourceResolverToken = 'OrderExternalSourceResolver';
export const TestExternalSourceResolverToken = 'TestExternalSourceResolver';

const service = {
    PatientExternalSource: PatientExternalSourceResolverToken,
    OrderExternalSource: OrderExternalSourceResolverToken,
    TestExternalSource: TestExternalSourceResolverToken,
}

export const InjectResolver = (token: keyof typeof service) => Inject(service[token]);