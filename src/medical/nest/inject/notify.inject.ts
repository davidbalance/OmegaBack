import { Inject } from "@nestjs/common";

export const PatientCreateNotifyToken = 'PatientCreateNotify';

const notify = {
    PatientCreate: PatientCreateNotifyToken
}

export const InjectNotify = (token: keyof typeof notify) => Inject(notify[token]);