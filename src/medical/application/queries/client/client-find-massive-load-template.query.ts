import { QueryHandlerAsync } from "@shared/shared/application";
import { SpreadsheetCell, SpreadsheetProvider } from "@shared/shared/providers";
import { ClientCreateCommandPayload } from "../../commands/client/client-create.command";

export type MassiveLoadTemplate = Omit<ClientCreateCommandPayload, 'patientGender' | 'patientBirthday'> & {
    patientGender: string;
    patientBirthday: string;
};
const spreadsheetData: MassiveLoadTemplate[] = [
    { patientDni: "12345678", patientName: "John", patientLastname: "Doe", patientEmail: "john.doe@example.com", patientGender: "Masculino", patientRole: "Your role can be empty", patientBirthday: "1990-05-15" },
    { patientDni: "23456789", patientName: "Jane", patientLastname: "Smith", patientEmail: "jane.smith@example.com", patientGender: "Femenino", patientRole: "Your role can be empty", patientBirthday: "1985-08-22" },
    { patientDni: "34567890", patientName: "Robert", patientLastname: "Brown", patientEmail: "robert.brown@example.com", patientGender: "Masculino", patientRole: "Your role can be empty", patientBirthday: "1978-11-10" },
    { patientDni: "45678901", patientName: "Emily", patientLastname: "Davis", patientEmail: "emily.davis@example.com", patientGender: "Femenino", patientRole: "Your role can be empty", patientBirthday: "1995-06-30" },
    { patientDni: "56789012", patientName: "Michael", patientLastname: "Wilson", patientEmail: "michael.wilson@example.com", patientGender: "Masculino", patientRole: "Your role can be empty", patientBirthday: "1980-09-12" },
    { patientDni: "67890123", patientName: "Sarah", patientLastname: "Miller", patientEmail: "sarah.miller@example.com", patientGender: "Femenino", patientRole: "Your role can be empty", patientBirthday: "1992-04-25" },
    { patientDni: "78901234", patientName: "David", patientLastname: "Anderson", patientEmail: "david.anderson@example.com", patientGender: "Masculino", patientRole: "Your role can be empty", patientBirthday: "1983-12-18" },
    { patientDni: "89012345", patientName: "Laura", patientLastname: "Thomas", patientEmail: "laura.thomas@example.com", patientGender: "Femenino", patientRole: "Your role can be empty", patientBirthday: "1998-07-07" },
    { patientDni: "90123456", patientName: "James", patientLastname: "White", patientEmail: "james.white@example.com", patientGender: "Masculino", patientRole: "Your role can be empty", patientBirthday: "1975-03-28" },
    { patientDni: "01234567", patientName: "Olivia", patientLastname: "Harris", patientEmail: "olivia.harris@example.com", patientGender: "Femenino", patientRole: "Your role can be empty", patientBirthday: "2000-01-14" }
]
export const massiveLoadTemplateSpreadsheet: SpreadsheetCell[] = [
    { value: 'Cedula del Paciente', font: { color: "366092", bold: true } },
    { value: 'Nombre del Paciente', font: { color: "366092", bold: true } },
    { value: 'Apellido del Paciente', font: { color: "366092", bold: true } },
    { value: 'Correo Electronico', font: { color: "366092", bold: true } },
    { value: 'Sexo', font: { color: "366092", bold: true } },
    { value: 'Role', font: { color: "366092", bold: true } },
    { value: 'Cumpleaños', font: { color: "366092", bold: true } },
]

export interface ClientFindMassiveLoadTemplateQuery extends QueryHandlerAsync<undefined, Buffer> {
    handleAsync(): Promise<Buffer>;
}

export class ClientFindMassiveLoadTemplateQueryImpl implements QueryHandlerAsync<undefined, Buffer> {
    constructor(
        private readonly spreadsheet: SpreadsheetProvider
    ) { }

    async handleAsync(): Promise<Buffer> {

        const data = spreadsheetData.map<SpreadsheetCell[]>(e => [...Object.values(e).map<SpreadsheetCell>(x => ({ value: x }))]);

        const value = await this.spreadsheet.craft([massiveLoadTemplateSpreadsheet, ...data]);
        return value;
    }
}