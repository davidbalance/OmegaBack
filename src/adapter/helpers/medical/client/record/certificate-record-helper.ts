import { CraftItemFunc, craftMedicalFitnessForJob, craftRecommendation, CraftRecordFunc, flatRecord } from "../generic-record-helper";
import { CertificateRecord } from "@omega/medical/application/type/certificate-record";
import { craftCell, craftHeader, craftRow, craftSpacing, craftTitle, emptyCell } from "../table.helper";
import { formatDate } from "date-fns";

export const createCertificateRecord: CraftRecordFunc<CertificateRecord> = (record: CertificateRecord, {
    fileNumber,
}) => flatRecord([
    craftHeader('Datos del Establecimiento - Empresa y Usuario'),
    institutionLayout({ ...record, fileNumber }),
    craftRow(craftSpacing({ colSpan: 70 })),
    craftHeader('Datos Generales'),
    generalDataLayout(record),
    craftRow(craftSpacing({ colSpan: 70 })),
    craftHeader('Aptitud Médica Laboral'),
    craftRow(craftCell('Después de la valoración médica ocupacional, se certifica que la persona mencionada ha sido calificada como:', { colSpan: 70 })),
    craftMedicalFitnessForJob(record, { hideLimitation: true }),
    craftRow(craftSpacing({ colSpan: 70 })),
    craftHeader('Evaluación Médica de Retiro'),
    retireEvaluation(record),
    craftRow(craftSpacing({ colSpan: 70 })),
    craftHeader('Recomendaciones y/o Tratamiento'),
    craftRecommendation(record)
]);

const institutionLayout: CraftItemFunc<CertificateRecord & {
    fileNumber: number;
}> = (record) => [
    craftRow(
        craftTitle('Institución del Sistema o Nombre de la Empresa', { colSpan: 16 }),
        craftTitle('RUC', { colSpan: 10 }),
        craftTitle('CIIU', { colSpan: 5 }),
        craftTitle('Establecimiento de Salud', { colSpan: 15 }),
        craftTitle('Número de Historia Clínica', { colSpan: 14 }),
        craftTitle('Número de Archivo', { colSpan: 10 }),
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
        craftTitle('Primer apellido', { colSpan: 10 }),
        craftTitle('Segundo apellido', { colSpan: 10 }),
        craftTitle('Primer nombre', { colSpan: 10 }),
        craftTitle('Segundo nombre', { colSpan: 10 }),
        craftTitle('Sexo', { colSpan: 5 }),
        craftTitle('Puesto de trabajo (CIUO)', { colSpan: 25 }),
    ),
    craftRow(
        craftCell(record.patientLastName, { colSpan: 10 }),
        craftCell(record.patientSecondLastName, { colSpan: 10 }),
        craftCell(record.patientFirstName, { colSpan: 10 }),
        craftCell(record.patientMiddleName, { colSpan: 10 }),
        craftCell(record.patientGender === 'male' ? 'H' : 'M', { fontSize: 5, colSpan: 5 }),
        craftCell(record.jobPosition, { colSpan: 25 })
    ),
];

const generalDataLayout: CraftItemFunc<CertificateRecord> = (record) => {
    const emissionDate = new Date();

    return [
        craftRow(emptyCell({ border: ['left', 'right'], colSpan: 70 })),
        craftRow(
            craftCell('Fecha de emisión:', { border: ['left'], colSpan: 10 }),
            craftCell(formatDate(emissionDate, 'yyyy'), { colSpan: 5 }),
            craftCell(formatDate(emissionDate, 'MM'), { colSpan: 5 }),
            craftCell(formatDate(emissionDate, 'dd'), { colSpan: 5 }),
            emptyCell({ border: ['right'], colSpan: 45 })
        ),
        craftRow(emptyCell({ border: ['left', 'right'], colSpan: 70 })),
        craftRow(
            craftCell('Evaluación:', { border: ['left'], colSpan: 10 }),
            craftCell('Ingreso', { colSpan: 5, border: [], alignment: "right" }),
            craftCell(record.generalData === 'entry' ? 'x' : '', { colSpan: 5, alignment: 'center', fontSize: 10 }),
            craftCell('Periódico', { colSpan: 5, border: [], alignment: "right" }),
            craftCell(record.generalData === 'periodic' ? 'x' : '', { colSpan: 5, alignment: 'center', fontSize: 10 }),
            craftCell('Reintegro', { colSpan: 5, border: [], alignment: "right" }),
            craftCell(record.generalData === 'reintegrate' ? 'x' : '', { colSpan: 5, alignment: 'center', fontSize: 10 }),
            craftCell('Retiro', { colSpan: 5, border: [], alignment: "right" }),
            craftCell(record.generalData === 'retirement' ? 'x' : '', { colSpan: 5, alignment: 'center', fontSize: 10 }),
            emptyCell({ border: ['right'], colSpan: 20 })
        ),
        craftRow(emptyCell({ border: ['left', 'right', 'bottom'], colSpan: 70 })),
    ]
};

const retireEvaluation: CraftItemFunc<CertificateRecord> = (record) => [
    craftRow(emptyCell({ colSpan: 70, border: ['left', 'right'] })),
    craftRow(
        craftCell('El usuario se realizó la evaluación médica de retiro', { colSpan: 35, border: ['left'] }),
        craftTitle('Sí', { colSpan: 5, border: [] }),
        craftCell(record.retirementEvaluationDone ? 'x' : '', { colSpan: 5, alignment: 'center', fontSize: 10 }),
        craftTitle('No', { colSpan: 5, border: [] }),
        craftCell(!record.retirementEvaluationDone ? 'x' : '', { colSpan: 5, alignment: 'center', fontSize: 10 }),
        emptyCell({ colSpan: 15, border: ['right'] })
    ),
    craftRow(emptyCell({ colSpan: 70, border: ['left', 'right'] })),
    craftRow(
        craftCell('Condición del diagnóstico', { colSpan: 35, border: ['left'] }),
        craftTitle('Presuntiva', { colSpan: 5, border: [] }),
        craftCell(record.retirementEvaluationCondition === 'presuntive' ? 'x' : '', { colSpan: 5, alignment: 'center', fontSize: 10 }),
        craftTitle('Definitiva', { colSpan: 5, border: [] }),
        craftCell(record.retirementEvaluationCondition === 'definitive' ? 'x' : '', { colSpan: 5, alignment: 'center', fontSize: 10 }),
        craftTitle('No Aplica', { colSpan: 5, border: [] }),
        craftCell(record.retirementEvaluationCondition === 'no-apply' ? 'x' : '', { colSpan: 5, alignment: 'center', fontSize: 10 }),
        emptyCell({ colSpan: 5, border: ['right'] })
    ),
    craftRow(emptyCell({ colSpan: 70, border: ['left', 'right'] })),
    craftRow(
        craftCell('La condición de salud esta relacionada con el trabajo', { colSpan: 35, border: ['left'] }),
        craftTitle('Si', { colSpan: 5, border: [] }),
        craftCell(record.retirementEvaluationConditionWithJob === 'yes' ? 'x' : '', { colSpan: 5, alignment: 'center', fontSize: 10 }),
        craftTitle('No', { colSpan: 5, border: [] }),
        craftCell(record.retirementEvaluationConditionWithJob === 'no' ? 'x' : '', { colSpan: 5, alignment: 'center', fontSize: 10 }),
        craftTitle('No Aplica', { colSpan: 5, border: [] }),
        craftCell(record.retirementEvaluationConditionWithJob === 'no-apply' ? 'x' : '', { colSpan: 5, alignment: 'center', fontSize: 10 }),
        emptyCell({ colSpan: 5, border: ['right'] })
    ),
    craftRow(emptyCell({ colSpan: 70, border: ['left', 'right', 'bottom'] })),
];