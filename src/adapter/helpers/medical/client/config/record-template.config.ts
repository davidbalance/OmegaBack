import { registerAs } from "@nestjs/config";

export const RecordTemplateName: string = 'RecordTemplateName';

export default registerAs(RecordTemplateName, (): Record<string, string> => ({
    femo: process.env.RECORD_FEMO_TEMPLATE || '',
    certificate: process.env.RECORD_CERTIFICATE_TEMPLATE || '',
}))