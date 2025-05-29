import { craftCurrentDisease, craftDiagnosticHeader, CraftItemFunc, craftMedicalConsultation, craftMedicalDiagnostic, craftMedicalFitnessForJob, craftPhysicalRegionalExam, craftRecommendation, CraftRecordFunc, craftSpecificAndGeneralResults, craftVitalSignsAndAnthropometry, flatRecord } from "../generic-record-helper";
import { ReintegrateRecord } from "@omega/medical/application/type/reintegrate-record";
import { craftCell, craftHeader, craftRow, craftSpacing, craftTitle } from "../table.helper";
import { formatDate } from "date-fns";

export const createReintegrationRecord: CraftRecordFunc<ReintegrateRecord> = (record: ReintegrateRecord, { fileNumber, }) => flatRecord([
    craftHeader('DATOS DEL ESTABLECIMIENTO - EMPRESA Y USUARIO'),
    institutionLayout({ ...record, fileNumber }),
    craftRow(craftSpacing({ colSpan: 70 })),
    craftHeader('MOTIVO DE CONSULTA'),
    craftMedicalConsultation(record),
    craftRow(craftSpacing({ colSpan: 70 })),
    craftHeader('ENFERMEDAD ACTUAL'),
    craftCurrentDisease(record),
    craftRow(craftSpacing({ colSpan: 70 })),
    craftHeader('CONSTANTES VITALES Y ANTROPOMETRÍA'),
    craftVitalSignsAndAnthropometry(record),
    craftRow(craftSpacing({ colSpan: 70 })),
    craftHeader('EXAMEN FÍSICO REGIONAL'),
    craftPhysicalRegionalExam(record),
    craftRow(craftSpacing({ colSpan: 70 })),
    craftHeader('RESULTADOS DE EXÁMENES (IMAGEN, LABORATORIO Y OTROS)'),
    craftSpecificAndGeneralResults(record),
    craftRow(craftSpacing({ colSpan: 70 })),
    craftDiagnosticHeader(),
    craftMedicalDiagnostic(record.diagnostics),
    craftRow(craftSpacing({ colSpan: 70 })),
    craftHeader('APTITUD MÉDICA PARA EL TRABAJO'),
    craftMedicalFitnessForJob(record, { showReubication: true }),
    craftRow(craftSpacing({ colSpan: 70 })),
    craftHeader('RECOMENDACIONES Y/O TRATAMIENTO'),
    craftRecommendation(record)
]);

const institutionLayout: CraftItemFunc<ReintegrateRecord & {
    fileNumber: number;
}> = (record) => [
    craftRow(
        craftTitle('INSTITUCIÓN DEL SISTEMA O NOMBRE DE LA EMPRESA', { colSpan: 16 }),
        craftTitle('RUC', { colSpan: 10 }),
        craftTitle('CIU', { colSpan: 5 }),
        craftTitle('ESTABLECIMIENTO DE SALUD', { colSpan: 15 }),
        craftTitle('NÚMERO DE HISTORIA CLÍNICA', { colSpan: 14 }),
        craftTitle('NÚMERO DE ARCHIVO', { colSpan: 10 }),
    ),
    craftRow(
        craftCell(record.companyName, { colSpan: 16 }),
        craftCell(record.companyRUC, { colSpan: 10 }),
        craftCell(record.companyCIIU ?? '', { colSpan: 5 }),
        craftCell(record.institutionHealthFacility, { colSpan: 15 }),
        craftCell(record.patientDni, { colSpan: 14 }),
        craftCell(record.fileNumber.toString().padStart(12, '0'), { colSpan: 10 }),
    ),
    craftRow(
        craftTitle('PRIMER APELLIDO', { colSpan: 6 }),
        craftTitle('SEGUNDO APELLIDO', { colSpan: 6 }),
        craftTitle('PRIMER NOMBRE', { colSpan: 6 }),
        craftTitle('SEGUNDO NOMBRE', { colSpan: 6 }),
        craftTitle('SEXO', { colSpan: 5 }),
        craftTitle('EDAD', { colSpan: 5 }),
        craftTitle('PUESTO DE TRABAJO (CIUO)', { colSpan: 6 }),
        craftTitle('FECHA DEL ÚLTIMO DÍA LABORAL', { colSpan: 6 }),
        craftTitle('FECHA DE REINGRESO', { colSpan: 6 }),
        craftTitle('TOTAL (DÍAS)', { colSpan: 6 }),
        craftTitle('CAUSA DE SALIDA', { colSpan: 12 }),
    ),
    craftRow(
        craftCell(record.patientLastName, { colSpan: 6 }),
        craftCell(record.patientSecondLastName, { colSpan: 6 }),
        craftCell(record.patientFirstName, { colSpan: 6 }),
        craftCell(record.patientMiddleName, { colSpan: 6 }),
        craftCell(record.patientGender === 'male' ? 'Masculino' : 'Femenino', { colSpan: 5, fontSize: 5 }),
        craftCell(record.patientAge.toString(), { colSpan: 5 }),
        craftCell(record.jobPosition, { colSpan: 6 }),
        craftCell(formatDate(record.workingEndDate, 'yyyy/MM/dd'), { colSpan: 6 }),
        craftCell(formatDate(record.workingReintegrationDate, 'yyyy/MM/dd'), { colSpan: 6 }),
        craftCell(record.workingTime.toString(), { colSpan: 6 }),
        craftCell(record.workingLeftCause.toString(), { colSpan: 12 }),
    ),
]