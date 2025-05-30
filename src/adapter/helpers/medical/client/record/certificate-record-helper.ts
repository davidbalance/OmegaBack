import { CraftItemFunc, craftMedicalFitnessForJob, craftRecommendation, CraftRecordFunc, flatRecord } from "../generic-record-helper";
import { CertificateRecord } from "@omega/medical/application/type/certificate-record";
import { craftCell, craftHeader, craftRow, craftSpacing, craftTitle, emptyCell } from "../table.helper";
import { formatDate } from "date-fns";

export const createCertificateRecord: CraftRecordFunc<CertificateRecord> = (record: CertificateRecord, {
    clinicNumber,
    fileNumber,
}) => flatRecord([
    craftHeader('DATOS DEL ESTABLECIMIENTO - EMPRESA Y USUARIO'),
    institutionLayout({ ...record, clinicNumber, fileNumber }),
    craftRow(craftSpacing({ colSpan: 70 })),
    craftHeader('DATOS GENERALES'),
    generalDataLayout(record),
    craftRow(craftSpacing({ colSpan: 70 })),
    craftHeader('APTITUD MÉDICA LABORAL'),
    craftRow(craftCell('Después de la valoración médica ocupacional se certifica que la persona en mención, es calificada como:', { colSpan: 70 })),
    craftMedicalFitnessForJob(record),
    craftRow(craftSpacing({ colSpan: 70 })),
    craftHeader('EVALUACIÓN MÉDICA DE RETIRO'),
    retireEvaluation(record),
    craftRow(craftSpacing({ colSpan: 70 })),
    craftHeader('RECOMENDACIONES Y/O TRATAMIENTO'),
    craftRecommendation(record)
]);

const institutionLayout: CraftItemFunc<CertificateRecord & {
    clinicNumber: number;
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
        craftCell(record.companyCIU, { colSpan: 5 }),
        craftCell(record.institutionHealthFacility, { colSpan: 15 }),
        craftCell(record.clinicNumber.toString().padStart(12, '0'), { colSpan: 14 }),
        craftCell(record.fileNumber.toString().padStart(12, '0'), { colSpan: 10 }),
    ),
    craftRow(
        craftTitle('PRIMER APELLIDO', { colSpan: 10 }),
        craftTitle('SEGUNDO APELLIDO', { colSpan: 10 }),
        craftTitle('PRIMER NOMBRE', { colSpan: 10 }),
        craftTitle('SEGUNDO NOMBRE', { colSpan: 10 }),
        craftTitle('SEXO', { colSpan: 5 }),
        craftTitle('PUESTO DE TRABAJO (CIUO)', { colSpan: 25 }),
    ),
    craftRow(
        craftCell(record.patientLastName, { colSpan: 10 }),
        craftCell(record.patientSecondLastName, { colSpan: 10 }),
        craftCell(record.patientFirstName, { colSpan: 10 }),
        craftCell(record.patientMiddleName, { colSpan: 10 }),
        craftCell(record.patientGender === 'male' ? 'Masculino' : 'Femenino', { fontSize: 5, colSpan: 5 }),
        craftCell(record.jobPosition, { colSpan: 25 })
    ),
];

const generalDataLayout: CraftItemFunc<CertificateRecord> = (record) => {
    const emissionDate = new Date();

    return [
        craftRow(emptyCell({ border: ['left', 'right'], colSpan: 70 })),
        craftRow(
            craftCell('FECHA DE EMISION:', { border: ['left'], colSpan: 10 }),
            craftCell(formatDate(emissionDate, 'yyyy'), { colSpan: 5 }),
            craftCell(formatDate(emissionDate, 'MM'), { colSpan: 5 }),
            craftCell(formatDate(emissionDate, 'dd'), { colSpan: 5 }),
            emptyCell({ border: ['right'], colSpan: 45 })
        ),
        craftRow(emptyCell({ border: ['left', 'right'], colSpan: 70 })),
        craftRow(
            craftCell('EVALUACIÓN:', { border: ['left'], colSpan: 10 }),
            craftCell('INGRESO', { colSpan: 5, border: [], alignment: "right" }),
            craftCell(record.generalData === 'entry' ? 'x' : '', { colSpan: 5, }),
            craftCell('PERIÓDICO', { colSpan: 5, border: [], alignment: "right" }),
            craftCell(record.generalData === 'periodic' ? 'x' : '', { colSpan: 5, }),
            craftCell('REINTEGRO', { colSpan: 5, border: [], alignment: "right" }),
            craftCell(record.generalData === 'reintegrate' ? 'x' : '', { colSpan: 5, }),
            craftCell('RETIRO', { colSpan: 5, border: [], alignment: "right" }),
            craftCell(record.generalData === 'retirement' ? 'x' : '', { colSpan: 5, }),
            emptyCell({ border: ['right'], colSpan: 20 })
        ),
        craftRow(emptyCell({ border: ['left', 'right', 'bottom'], colSpan: 70 })),
    ]
};

const retireEvaluation: CraftItemFunc<CertificateRecord> = (record) => [
    craftRow(emptyCell({ colSpan: 70, border: ['left', 'right'] })),
    craftRow(
        craftCell('El usuario se realizó la evaluación médica de retiro', { colSpan: 35, border: ['left'] }),
        craftTitle('SI', { colSpan: 5, border: [] }),
        craftCell(record.retirementEvaluationDone ? 'x' : '', { colSpan: 5 }),
        craftTitle('NO', { colSpan: 5, border: [] }),
        craftCell(!record.retirementEvaluationDone ? 'x' : '', { colSpan: 5 }),
        emptyCell({ colSpan: 15, border: ['right'] })
    ),
    craftRow(emptyCell({ colSpan: 70, border: ['left', 'right'] })),
    craftRow(
        craftCell('Condición del diagnóstico', { colSpan: 35, border: ['left'] }),
        craftTitle('Presuntiva', { colSpan: 5, border: [] }),
        craftCell(record.retirementEvaluationCondition === 'presuntive' ? 'x' : '', { colSpan: 5 }),
        craftTitle('Definitiva', { colSpan: 5, border: [] }),
        craftCell(record.retirementEvaluationCondition === 'definitive' ? 'x' : '', { colSpan: 5 }),
        craftTitle('No Aplica', { colSpan: 5, border: [] }),
        craftCell(record.retirementEvaluationCondition === 'no-apply' ? 'x' : '', { colSpan: 5 }),
        emptyCell({ colSpan: 5, border: ['right'] })
    ),
    craftRow(emptyCell({ colSpan: 70, border: ['left', 'right'] })),
    craftRow(
        craftCell('La condición de salud esta relacionada con el trabajo', { colSpan: 35, border: ['left'] }),
        craftTitle('Si', { colSpan: 5, border: [] }),
        craftCell(record.retirementEvaluationConditionWithJob === 'yes' ? 'x' : '', { colSpan: 5 }),
        craftTitle('No', { colSpan: 5, border: [] }),
        craftCell(record.retirementEvaluationConditionWithJob === 'no' ? 'x' : '', { colSpan: 5 }),
        craftTitle('No Aplica', { colSpan: 5, border: [] }),
        craftCell(record.retirementEvaluationConditionWithJob === 'no-apply' ? 'x' : '', { colSpan: 5 }),
        emptyCell({ colSpan: 5, border: ['right'] })
    ),
    craftRow(emptyCell({ colSpan: 70, border: ['left', 'right', 'bottom'] })),
];