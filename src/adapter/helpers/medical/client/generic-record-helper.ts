import { GenericRecord } from "@omega/medical/application/commands/client/client-add-record.command"
import { CertificateRecord } from "@omega/medical/application/type/certificate-record"
import { InitialRecord } from "@omega/medical/application/type/initial-record"
import { PeriodicRecord } from "@omega/medical/application/type/periodic-record"
import { ReintegrateRecord } from "@omega/medical/application/type/reintegrate-record"
import { RetirementRecord } from "@omega/medical/application/type/retirement-record"
import { createInitialRecord } from "./record/initial-record-helper"
import { Cell, craftCell, craftRow, craftSubtitle, craftTitle, emptyCell, Row, RowSpan } from "./table.helper"
import { CurrentDisease, ExtraActivity, FamilyHistory, GeneralExamResultAndSpecific, JobAccident, LifeStyle, MedicalAndSurgicalHistory, MedicalConsultation, MedicalDiagnostic, MedicalFitnessForJob, OccupationalDisease, PhysicalRegionalExam, RecordRecommendation, ReviewOfOrgansAndSystem, ToxicDetail, VitalSignsAndAnthropometry } from "@omega/medical/application/type/record.type"
import { formatDate } from "date-fns"
import { createPeriodicRecord } from "./record/periodic-record-helper"
import { createRetirementRecord } from "./record/retirement-record-helper"
import { createReintegrationRecord } from "./record/reintegration-record-helper"
import { createCertificateRecord } from "./record/certificate-record-helper"

const isInitialRecord = (record: GenericRecord): record is InitialRecord => record.type === 'inicial';
const isPeriodicRecord = (record: GenericRecord): record is PeriodicRecord => record.type === 'periodico';
const isReintegrateRecord = (record: GenericRecord): record is ReintegrateRecord => record.type === 'reintegrar';
const isRetirementRecord = (record: GenericRecord): record is RetirementRecord => record.type === 'retiro';
const isCertificateRecord = (record: GenericRecord): record is CertificateRecord => record.type === 'certificado';

type RecordOption = {
    clinicNumber: number;
    fileNumber: number;
}
export type CraftItemFunc<T extends GenericRecord> = (record: T) => Row[];
export type CraftRecordFunc<T extends GenericRecord> = (record: T, option: RecordOption) => Row[];
export const createRecordLayout = (record: GenericRecord, option: RecordOption): Row[] => {
    if (isInitialRecord(record)) {
        return createInitialRecord(record, { ...option });
    }
    if (isPeriodicRecord(record)) {
        return createPeriodicRecord(record, { ...option });
    }
    if (isReintegrateRecord(record)) {
        return createReintegrationRecord(record, { ...option });
    }
    if (isRetirementRecord(record)) {
        return createRetirementRecord(record, { ...option });
    }
    if (isCertificateRecord(record)) {
        return createCertificateRecord(record, { ...option });
    }

    return [];
}

export const flatRecord = (rows: (Row | Row[])[]): Row[] => {
    const flatten: Row[] = [];

    for (const row of rows) {
        if (Array.isArray(row)) {
            flatten.push(...row);
        } else {
            flatten.push(row);
        }
    }

    return flatten;
}

export const craftLabel = (label: string): Row =>
    (length) => ({
        row: [craftCell(label, { border: ['left', 'right'], colSpan: length, style: 'label' }), ...Array.from<Cell>({ length: length - 1 }).fill(emptyCell())],
        nextSpan: Array.from<RowSpan>({ length }).fill({ horizontal: 0, vertical: 0 })
    });

export const craftMedicalConsultation = (value: MedicalConsultation): Row[] => [
    craftLabel('Descripcion'),
    craftRow(craftCell(value.medicalConsultationDescription, { border: ['left', 'right', 'bottom'], colSpan: 70 }))
]

export const craftMedicalAndSurgicalHistory = (value: MedicalAndSurgicalHistory): Row[] => [
    craftRow(craftTitle('ANTECEDENTES CLÍNICOS Y QUIRÚRGICOS', { colSpan: 70 })),
    craftLabel('Descripcion'),
    craftRow(craftCell(value.medicalAndSurgicalHistory, { border: ['left', 'right', 'bottom'], colSpan: 70 })),
]

export const craftToxicHabitsAndLifeStyle = (toxic: { tobacco: Partial<ToxicDetail>, alcohol: Partial<ToxicDetail>, other: Partial<ToxicDetail> }, life: LifeStyle): Row[] => [
    craftRow(
        craftTitle('HÁBITOS TÓXICOS', { colSpan: 35 }),
        craftTitle('ESTILO DE VIDA', { colSpan: 35 }),
    ),
    craftRow(
        craftSubtitle('CONSUMOS NOCIVOS', { colSpan: 12 }),
        craftSubtitle('SI', { colSpan: 2 }),
        craftSubtitle('NO', { colSpan: 2 }),
        craftSubtitle('TIEMPO DE CONSUMO (meses)', { colSpan: 5 }),
        craftSubtitle('CANTIDAD', { colSpan: 4 }),
        craftSubtitle('EX CONSUMIDOR', { colSpan: 4 }),
        craftSubtitle('TIEMPO DE ABSTINENCIA (meses)', { colSpan: 6 }),

        craftSubtitle('ESTILO', { colSpan: 10 }),
        craftSubtitle('SI', { colSpan: 2 }),
        craftSubtitle('NO', { colSpan: 2 }),
        craftSubtitle('¿CUÁL?', { colSpan: 17 }),
        craftSubtitle('TIEMPO / CANTIDAD', { colSpan: 4 }),
    ),
    craftRow(
        craftCell('TABACO', { colSpan: 12 }),
        craftCell(toxic.tobacco.consumed ? 'x' : '', { colSpan: 2 }),
        craftCell(!toxic.tobacco.consumed ? 'x' : '', { colSpan: 2 }),
        craftCell(toxic.tobacco.consumptionTime?.toString() ?? '', { colSpan: 5 }),
        craftCell(toxic.tobacco.quantity?.toString() ?? '', { colSpan: 4 }),
        craftCell(toxic.tobacco.consumer ? 'Si' : 'No', { colSpan: 4 }),
        craftCell(toxic.tobacco.timeOfAbstinence?.toString() ?? '', { colSpan: 6 }),

        craftCell('ACTIVIDAD FÍSICA', { colSpan: 10 }),
        craftCell(life.lifestylePhysicalActivityActive ? 'x' : '', { colSpan: 2 }),
        craftCell(!life.lifestylePhysicalActivityActive ? 'x' : '', { colSpan: 2 }),
        craftCell(life.lifestylePhysicalActivityDuration?.toString() ?? '', { colSpan: 17 }),
        craftCell(life.lifestylePhysicalActivityType?.toString() ?? '', { colSpan: 4 })
    ),
    craftRow(
        craftCell('ALCOCHOL', { colSpan: 12 }),
        craftCell(toxic.alcohol.consumed ? 'x' : '', { colSpan: 2 }),
        craftCell(!toxic.alcohol.consumed ? 'x' : '', { colSpan: 2 }),
        craftCell(toxic.alcohol.consumptionTime?.toString() ?? '', { colSpan: 5 }),
        craftCell(toxic.alcohol.quantity?.toString() ?? '', { colSpan: 4 }),
        craftCell(toxic.alcohol.consumer ? 'Si' : 'No', { colSpan: 4 }),
        craftCell(toxic.alcohol.timeOfAbstinence?.toString() ?? '', { colSpan: 6 }),

        craftCell('MEDICACIÓN HABITUAL', { rowSpan: 2, colSpan: 10 }),
        craftCell(life.lifestyleMedicationTaking ? 'x' : '', { rowSpan: 2, colSpan: 2 }),
        craftCell(!life.lifestyleMedicationTaking ? 'x' : '', { rowSpan: 2, colSpan: 2 }),
        craftCell(life.lifestyleMedicationQuantity?.toString() ?? '', { rowSpan: 2, colSpan: 17 }),
        craftCell(life.lifestyleMedicationName?.toString() ?? '', { rowSpan: 2, colSpan: 4 })
    ),
    craftRow(
        craftCell(`OTRAS DROGAS: ${toxic.other.other ?? ''}`, { colSpan: 12 }),
        craftCell(toxic.other.consumed ? 'x' : '', { colSpan: 2 }),
        craftCell(!toxic.other.consumed ? 'x' : '', { colSpan: 2 }),
        craftCell(toxic.other.consumptionTime?.toString() ?? '', { colSpan: 5 }),
        craftCell(toxic.other.quantity?.toString() ?? '', { colSpan: 4 }),
        craftCell(toxic.other.consumer ? 'Si' : 'No', { colSpan: 4 }),
        craftCell(toxic.other.timeOfAbstinence?.toString() ?? '', { colSpan: 6 })
    )
];

export const craftJobAccident = (value: JobAccident): Row[] => [
    craftRow(craftTitle('ACCIDENTES DE TRABAJO (DESCRIPCIÓN)', { colSpan: 70 })),
    craftRow(emptyCell({ colSpan: 70, border: ['top', 'left', 'right'] })),
    craftRow(
        craftCell('FUE CALIFICADO POR EL INSTITUTO DE SEGURIDAD SOCIAL CORRESPONDIENTE:', { border: ['left'], colSpan: 30 }),
        craftCell('SI', { border: [], colSpan: 2 }),
        craftCell(value.jobAccidentHappened ? 'x' : ''),
        craftCell('ESPECIFICAR: ', { border: [], colSpan: 4 }),
        craftCell(value.jobAccidentDescription ?? '_____________', { border: [], colSpan: 14 }),
        craftCell('NO', { border: [], colSpan: 2 }),
        craftCell(!value.jobAccidentHappened ? 'x' : ''),
        craftCell('FECHA:', { border: [], colSpan: 4 }),
        craftCell(value.jobAccidentDate ? formatDate(value.jobAccidentDate, 'yyyy') : '', { colSpan: 3 }),
        craftCell(value.jobAccidentDate ? formatDate(value.jobAccidentDate, 'MM') : '', { colSpan: 3 }),
        craftCell(value.jobAccidentDate ? formatDate(value.jobAccidentDate, 'dd') : '', { colSpan: 3 }),
        emptyCell({ border: ['right'], colSpan: 3 })
    ),
    craftRow(emptyCell({ colSpan: 70, border: ['bottom', 'left', 'right'] })),
    craftLabel('Observaciones:'),
    craftRow(
        craftCell(value.jobAccidentObservation ?? '', { colSpan: 70, border: ['bottom', "left", 'right'] })
    ),
];

export const craftOccupationalDisease = (value: OccupationalDisease): Row[] => [
    craftRow(craftTitle('ENFERMEDADES PROFESIONALES', { colSpan: 70 })),
    craftRow(emptyCell({ colSpan: 70, border: ['top', 'left', 'right'] })),
    craftRow(
        craftCell('FUE CALIFICADO POR EL INSTITUTO DE SEGURIDAD SOCIAL CORRESPONDIENTE:', { border: ['left'], colSpan: 30 }),
        craftCell('SI', { border: [], colSpan: 2 }),
        craftCell(value.occupationalDiseaseHappened ? 'x' : ''),
        craftCell('ESPECIFICAR: ', { border: [], colSpan: 4 }),
        craftCell(value.occupationalDiseaseDescription ?? '_____________', { border: [], colSpan: 14 }),
        craftCell('NO', { border: [], colSpan: 2 }),
        craftCell(!value.occupationalDiseaseHappened ? 'x' : ''),
        craftCell('FECHA:', { border: [], colSpan: 4 }),
        craftCell(value.occupationalDiseaseDate ? formatDate(value.occupationalDiseaseDate, 'yyyy') : '', { colSpan: 3 }),
        craftCell(value.occupationalDiseaseDate ? formatDate(value.occupationalDiseaseDate, 'MM') : '', { colSpan: 3 }),
        craftCell(value.occupationalDiseaseDate ? formatDate(value.occupationalDiseaseDate, 'dd') : '', { colSpan: 3 }),
        emptyCell({ border: ['right'], colSpan: 3 })
    ),
    craftRow(emptyCell({ colSpan: 70, border: ['bottom', 'left', 'right'] })),
    craftLabel('Observaciones:'),
    craftRow(
        craftCell(value.occupationalDiseaseObservation ?? '', { colSpan: 70, border: ['bottom', "left", 'right'] })
    )
];

export const craftFamilyHistory = (value: FamilyHistory): Row[] => {

    const values: string[] = [
        !!value.familyHistoryCardioVascular ? `ENFERMEDAD CARDIO-VASCULAR: ${value.familyHistoryCardioVascular}` : undefined,
        !!value.familyHistoryMetabolic ? `ENFERMEDAD METABÓLICA: ${value.familyHistoryMetabolic}` : undefined,
        !!value.familyHistoryNeurologic ? `ENFERMEDAD NEUROLÓGICA: ${value.familyHistoryNeurologic}` : undefined,
        !!value.familyHistoryOncologic ? `ENFERMEDAD ONCOLÓGICA: ${value.familyHistoryOncologic}` : undefined,
        !!value.familyHistoryInfectious ? `ENFERMEDAD INFECCIOSA: ${value.familyHistoryInfectious}` : undefined,
        !!value.familyHistoryHereditary ? `ENFERMEDAD HEREDITARIA/CONGÉNITA: ${value.familyHistoryHereditary}` : undefined,
        !!value.familyHistoryDisability ? `DISCAPACIDADES: ${value.familyHistoryDisability}` : undefined,
        !!value.familyHistoryOther ? `OTROS: ${value.familyHistoryOther}` : undefined
    ].filter(e => e !== undefined);

    return [
        craftRow(
            craftTitle('ENFERMEDAD CARDIO-VASCULAR', { colSpan: 7 }),
            craftCell(value.familyHistoryCardioVascular ? 'x' : '', { colSpan: 2 }),
            craftTitle('ENFERMEDAD METABÓLICA', { colSpan: 7 }),
            craftCell(value.familyHistoryMetabolic ? 'x' : '', { colSpan: 2 }),
            craftTitle('ENFERMEDAD NEUROLÓGICA', { colSpan: 7 }),
            craftCell(value.familyHistoryNeurologic ? 'x' : '', { colSpan: 2 }),
            craftTitle('ENFERMEDAD ONCOLÓGICA', { colSpan: 7 }),
            craftCell(value.familyHistoryOncologic ? 'x' : '', { colSpan: 2 }),
            craftTitle('ENFERMEDAD INFECCIOSA', { colSpan: 7 }),
            craftCell(value.familyHistoryInfectious ? 'x' : '', { colSpan: 2 }),
            craftTitle('ENFERMEDAD HEREDITARIA / CONGÉNITA', { colSpan: 7 }),
            craftCell(value.familyHistoryHereditary ? 'x' : '', { colSpan: 2 }),
            craftTitle('DISCAPACIDADES', { colSpan: 6 }),
            craftCell(value.familyHistoryDisability ? 'x' : '', { colSpan: 2 }),
            craftTitle('OTROS', { colSpan: 6 }),
            craftCell(value.familyHistoryOther ? 'x' : '', { colSpan: 2 }),
        ),
        craftLabel('Observaciones:'),
        ...values.map((e, i) => craftRow(craftCell(e, { colSpan: 70, border: ['left', 'right', values.length - 1 === i ? 'bottom' : 'right'] }))).filter(e => !!e)
    ];
};

export const craftExtraActivity = (value: ExtraActivity): Row[] => [
    craftLabel('Observaciones:'),
    craftRow(craftCell(value.extraActivityDescription, { border: ['left', 'right', 'bottom'], colSpan: 70 }))
];


export const craftCurrentDisease = (value: CurrentDisease): Row[] => [
    craftLabel('Observaciones:'),
    craftRow(craftCell(value.currentDiseaseDescription, { border: ['left', 'right', 'bottom'], colSpan: 70 }))
];

export const craftReviewOfOrgansAndSystem = (value: ReviewOfOrgansAndSystem): Row[] => {

    const values: string[] = [
        !!value.reviewOfOrgansSkin ? `PIEL - ANEXOS: ${value.reviewOfOrgansSkin}` : undefined,
        !!value.reviewOfOrgansSenseOrgans ? `ÓRGANOS DE LOS SENTIDOS: ${value.reviewOfOrgansSenseOrgans}` : undefined,
        !!value.reviewOfOrgansBreath ? `RESPIRATORIO: ${value.reviewOfOrgansBreath}` : undefined,
        !!value.reviewOfOrgansCardiovascular ? `CARDIO-VASCULAR: ${value.reviewOfOrgansCardiovascular}` : undefined,
        !!value.reviewOfOrgansDigestive ? `DIGESTIVO: ${value.reviewOfOrgansDigestive}` : undefined,
        !!value.reviewOfOrgansUrinary ? `GENITO - URINARIO: ${value.reviewOfOrgansUrinary}` : undefined,
        !!value.reviewOfOrgansSkeletalMuscle ? `MÚSCULO ESQUELÉTICO: ${value.reviewOfOrgansSkeletalMuscle}` : undefined,
        !!value.reviewOfOrgansEndocrinic ? `ENDOCRINO: ${value.reviewOfOrgansEndocrinic}` : undefined,
        !!value.reviewOfOrgansHemoLymphatic ? `HEMO LINFÁTICO: ${value.reviewOfOrgansHemoLymphatic}` : undefined,
        !!value.reviewOfOrgansHighlyStrung ? `NERVIOSO: ${value.reviewOfOrgansHighlyStrung}` : undefined,
    ].filter(e => e !== undefined);

    return [
        craftRow(
            craftSubtitle('PIEL - ANEXOS', { colSpan: 12 }),
            craftCell(value.reviewOfOrgansSkin ? 'x' : ' ', { colSpan: 2 }),
            craftSubtitle('RESPIRATORIO', { colSpan: 12 }),
            craftCell(value.reviewOfOrgansBreath ? 'x' : ' ', { colSpan: 2 }),
            craftSubtitle('DIGESTIVO', { colSpan: 12 }),
            craftCell(value.reviewOfOrgansDigestive ? 'x' : ' ', { colSpan: 2 }),
            craftSubtitle('MÚSCULO ESQUELÉTICO', { colSpan: 12 }),
            craftCell(value.reviewOfOrgansSkeletalMuscle ? 'x' : ' ', { colSpan: 2 }),
            craftSubtitle('HEMO LINFÁTICO', { colSpan: 12 }),
            craftCell(value.reviewOfOrgansHemoLymphatic ? 'x' : ' ', { colSpan: 2 }),
        ),
        craftRow(
            craftSubtitle('ÓRGANOS DE LOS SENTIDOS', { colSpan: 12 }),
            craftCell(value.reviewOfOrgansSenseOrgans ? 'x' : ' ', { colSpan: 2 }),
            craftSubtitle('CARDIO-VASCULAR', { colSpan: 12 }),
            craftCell(value.reviewOfOrgansCardiovascular ? 'x' : ' ', { colSpan: 2 }),
            craftSubtitle('GENITO - URINARIO', { colSpan: 12 }),
            craftCell(value.reviewOfOrgansUrinary ? 'x' : ' ', { colSpan: 2 }),
            craftSubtitle('ENDOCRINO', { colSpan: 12 }),
            craftCell(value.reviewOfOrgansEndocrinic ? 'x' : ' ', { colSpan: 2 }),
            craftSubtitle('NERVIOSO', { colSpan: 12 }),
            craftCell(value.reviewOfOrgansHighlyStrung ? 'x' : ' ', { colSpan: 2 }),
        ),
        craftLabel('Observaciones:'),
        ...values.map((e, i) => craftRow(craftCell(e, { colSpan: 70, border: ['left', 'right', values.length - 1 === i ? 'bottom' : 'right'] }))).filter(e => !!e)
    ];
};

export const craftVitalSignsAndAnthropometry = (value: VitalSignsAndAnthropometry): Row[] => [
    craftRow(
        craftTitle('PRESIÓN ARTERIAL (mmHg)', { colSpan: 8 }),
        craftTitle('TEMPERATURA (°C)', { colSpan: 8 }),
        craftTitle('FRECUENCIA CARDIACA (Lat/min)', { colSpan: 8 }),
        craftTitle('SATURACIÓN DE OXÍGENO (O2%)', { colSpan: 8 }),
        craftTitle('FRECUENCIA RESPIRATORIA (fr/min)', { colSpan: 8 }),
        craftTitle('PESO (Kg)', { colSpan: 8 }),
        craftTitle('TALLA (cm)', { colSpan: 8 }),
        craftTitle('ÍNDICE DE MASA CORPORAL (kg/m2)', { colSpan: 7 }),
        craftTitle('PERÍMETRO ABDOMINAL (cm)', { colSpan: 7 }),
    ),
    craftRow(
        craftCell(value.vitalSignsBloodPressure.toString() ?? '', { colSpan: 8 }),
        craftCell(value.vitalSignsTemperature.toString() ?? '', { colSpan: 8 }),
        craftCell(value.vitalSignsHeartRate.toString() ?? '', { colSpan: 8 }),
        craftCell(value.vitalSignsOxygenSaturation.toString() ?? '', { colSpan: 8 }),
        craftCell(value.vitalSignsRespiratoryRate.toString() ?? '', { colSpan: 8 }),
        craftCell(value.vitalSignsWeight.toString() ?? '', { colSpan: 8 }),
        craftCell(value.vitalSignsSize.toString() ?? '', { colSpan: 8 }),
        craftCell(value.vitalSignsMassIndex.toString() ?? '', { colSpan: 7 }),
        craftCell(value.vitalSignsAbdominalPerimeter.toString() ?? '', { colSpan: 7 }),
    ),
];

export const craftPhysicalRegionalExam = (value: PhysicalRegionalExam): Row[] => {
    const values: string[] = [
        !!value.examSkinScar ? `Piel - Cicatrices: ${value.examSkinScar}` : undefined,
        !!value.examSkinTattoo ? `Piel - Tatuajes: ${value.examSkinTattoo}` : undefined,
        !!value.examSkinLesions ? `Piel - Piel  y Faneras: ${value.examSkinLesions}` : undefined,
        !!value.examEyeEyelids ? `Ojos - Párpados: ${value.examEyeEyelids}` : undefined,
        !!value.examEyeConjunctiva ? `Ojos - Conjuntivas: ${value.examEyeConjunctiva}` : undefined,
        !!value.examEyePupils ? `Ojos - Pupilas: ${value.examEyePupils}` : undefined,
        !!value.examEyeCorneas ? `Ojos - Córnea: ${value.examEyeCorneas}` : undefined,
        !!value.examEyeMotility ? `Ojos - Motilidad: ${value.examEyeMotility}` : undefined,
        !!value.examEarAuditoryExternal ? `Oído - C. auditivo externo: ${value.examEarAuditoryExternal}` : undefined,
        !!value.examEarAuricle ? `Oído - Pabellón: ${value.examEarAuricle}` : undefined,
        !!value.examEarEardrum ? `Oído - Tímpanos: ${value.examEarEardrum}` : undefined,
        !!value.examPharynxLips ? `Oro faringe - Labios: ${value.examPharynxLips}` : undefined,
        !!value.examPharynxTongue ? `Oro faringe - Lengua: ${value.examPharynxTongue}` : undefined,
        !!value.examPharynxPharynx ? `Oro faringe - Faringe: ${value.examPharynxPharynx}` : undefined,
        !!value.examPharynxTonsils ? `Oro faringe - Amígdalas: ${value.examPharynxTonsils}` : undefined,
        !!value.examPharynxTeeth ? `Oro faringe - Dentadura: ${value.examPharynxTeeth}` : undefined,
        !!value.examNosePartition ? `Nariz - Tabique: ${value.examNosePartition}` : undefined,
        !!value.examNoseTurbinates ? `Nariz - Cornetes: ${value.examNoseTurbinates}` : undefined,
        !!value.examNoseMucousMembranes ? `Nariz - Mucosas: ${value.examNoseMucousMembranes}` : undefined,
        !!value.examNoseParanasalSinuses ? `Nariz - Senos paranasales: ${value.examNoseParanasalSinuses}` : undefined,
        !!value.examNeckThyroid ? `Cuello - Tiroides / masas: ${value.examNeckThyroid}` : undefined,
        !!value.examNeckMobility ? `Cuello - Movilidad: ${value.examNeckMobility}` : undefined,
        !!value.examChestBreast ? `Tórax - Mamas: ${value.examChestBreast}` : undefined,
        !!value.examChestHeart ? `Tórax - Corazón: ${value.examChestHeart}` : undefined,
        !!value.examChestLungs ? `Tórax - Pulmones: ${value.examChestLungs}` : undefined,
        !!value.examChestRibCage ? `Tórax - Parrilla Costal: ${value.examChestRibCage}` : undefined,
        !!value.examAbdomenViscera ? `Abdomen - Vísceras: ${value.examAbdomenViscera}` : undefined,
        !!value.examAbdomenAbdominalWall ? `Abdomen - Pared abdominal: ${value.examAbdomenAbdominalWall}` : undefined,
        !!value.examColumnFlexibility ? `Columna - Flexibilidad: ${value.examColumnFlexibility}` : undefined,
        !!value.examColumnDeviation ? `Columna - Desviación: ${value.examColumnDeviation}` : undefined,
        !!value.examColumnPain ? `Columna - Dolor: ${value.examColumnPain}` : undefined,
        !!value.examPelvis ? `Pelvis - Pelvis: ${value.examPelvis}` : undefined,
        !!value.examPelvisGenitals ? `Pelvis - Genitales: ${value.examPelvisGenitals}` : undefined,
        !!value.examLimbVascular ? `Extremidades - Vascular: ${value.examLimbVascular}` : undefined,
        !!value.examLimbUpper ? `Extremidades - Miembros superiores: ${value.examLimbUpper}` : undefined,
        !!value.examLimbLower ? `Extremidades - Miembros inferiores: ${value.examLimbLower}` : undefined,
        !!value.examNeurologicForce ? `Neurológico - Fuerza : ${value.examNeurologicForce}` : undefined,
        !!value.examNeurologicSensitivity ? `Neurológico - Sensibilidad: ${value.examNeurologicSensitivity}` : undefined,
        !!value.examNeurologicGait ? `Neurológico - Marcha: ${value.examNeurologicGait}` : undefined,
        !!value.examNeurologicReflex ? `Neurológico - Reflejos: ${value.examNeurologicReflex}` : undefined,
    ].filter(e => e !== undefined);

    return [
        craftRow(craftTitle('REGIONES', { colSpan: 70 })),
        craftRow(
            craftCell('Piel', { rowSpan: 3, colSpan: 2, style: 'itemSubtitle', height: 20, orientation: 'vertical' }),
            craftSubtitle('a. Cicatrices', { colSpan: 10 }),
            craftCell(value.examSkinScar ? 'x' : '', { colSpan: 2 }),
            craftCell('Oído', { rowSpan: 3, colSpan: 2, style: 'itemSubtitle', height: 20, orientation: 'vertical' }),
            craftSubtitle('a. C. auditivo externo', { colSpan: 10 }),
            craftCell(value.examEarAuditoryExternal ? 'x' : '', { colSpan: 2 }),
            craftCell('Nariz', { rowSpan: 4, colSpan: 2, style: 'itemSubtitle', height: 20, orientation: 'vertical' }),
            craftSubtitle('a. Tabique', { colSpan: 10 }),
            craftCell(value.examNosePartition ? 'x' : '', { colSpan: 2 }),
            craftCell('Tórax', { rowSpan: 2, colSpan: 2, style: 'itemSubtitle', height: 20, orientation: 'vertical' }),
            craftSubtitle('a. Pulmones', { colSpan: 10 }),
            craftCell(value.examChestLungs ? 'x' : '', { colSpan: 2 }),
            craftCell('Pelvis', { rowSpan: 2, colSpan: 2, style: 'itemSubtitle', height: 20, orientation: 'vertical' }),
            craftSubtitle('a. Pelvis', { colSpan: 10 }),
            craftCell(value.examPelvis ? 'x' : '', { colSpan: 2 }),),
        craftRow(
            craftSubtitle('b. Tatuajes', { colSpan: 10 }),
            craftCell(value.examSkinTattoo ? 'x' : '', { colSpan: 2 }),
            craftSubtitle('b. Pabellón', { colSpan: 10 }),
            craftCell(value.examEarAuricle ? 'x' : '', { colSpan: 2 }),
            craftSubtitle('b. Cornetes', { colSpan: 10 }),
            craftCell(value.examNoseTurbinates ? 'x' : '', { colSpan: 2 }),
            craftSubtitle('b. Parrilla Costal', { colSpan: 10 }),
            craftCell(value.examChestRibCage ? 'x' : '', { colSpan: 2 }),
            craftSubtitle('b. Genitales', { colSpan: 10 }),
            craftCell(value.examPelvisGenitals ? 'x' : '', { colSpan: 2 }),),
        craftRow(
            craftSubtitle('c. Piel y Faneras', { colSpan: 10 }),
            craftCell(value.examSkinLesions ? 'x' : '', { colSpan: 2 }),
            craftSubtitle('c. Tímpanos', { colSpan: 10 }),
            craftCell(value.examEarEardrum ? 'x' : '', { colSpan: 2 }),
            craftSubtitle('c. Mucosas', { colSpan: 10 }),
            craftCell(value.examNoseMucousMembranes ? 'x' : '', { colSpan: 2 }),
            craftCell('Abdomen', { rowSpan: 2, colSpan: 2, style: 'itemSubtitle', height: 20, orientation: 'vertical' }),
            craftSubtitle('a. Vísceras', { colSpan: 10 }),
            craftCell(value.examAbdomenViscera ? 'x' : '', { colSpan: 2 }),
            craftCell('Extremidades', { rowSpan: 3, colSpan: 2, style: 'itemSubtitle', height: 30, orientation: 'vertical' }),
            craftSubtitle('a. Vascular', { colSpan: 10 }),
            craftCell(value.examLimbVascular ? 'x' : '', { colSpan: 2 }),),
        craftRow(
            craftCell('Ojos', { rowSpan: 5, colSpan: 2, style: 'itemSubtitle', height: 20, orientation: 'vertical' }),
            craftSubtitle('a. Párpados', { colSpan: 10 }),
            craftCell(value.examEyeEyelids ? 'x' : '', { colSpan: 2 }),
            craftCell('Oro faringe', { rowSpan: 5, colSpan: 2, style: 'itemSubtitle', height: 45, orientation: 'vertical' }),
            craftSubtitle('a. Labios', { colSpan: 10 }),
            craftCell(value.examPharynxLips ? 'x' : '', { colSpan: 2 }),
            craftSubtitle('d. Senos paranasales', { colSpan: 10 }),
            craftCell(value.examNoseParanasalSinuses ? 'x' : '', { colSpan: 2 }),
            craftSubtitle('b. Pared abdominal', { colSpan: 10 }),
            craftCell(value.examAbdomenAbdominalWall ? 'x' : '', { colSpan: 2 }),
            craftSubtitle('b. Miembros superiores', { colSpan: 10 }),
            craftCell(value.examLimbUpper ? 'x' : '', { colSpan: 2 }),),
        craftRow(
            craftSubtitle('b. Conjuntivas', { colSpan: 10 }),
            craftCell(value.examEyeConjunctiva ? 'x' : '', { colSpan: 2 }),
            craftSubtitle('b. Lengua', { colSpan: 10 }),
            craftCell(value.examPharynxTongue ? 'x' : '', { colSpan: 2 }),
            craftCell('Cuello', { rowSpan: 2, colSpan: 2, style: 'itemSubtitle', height: 20, orientation: 'vertical' }),
            craftSubtitle('a. Tiroides / masas', { colSpan: 10 }),
            craftCell(value.examNeckThyroid ? 'x' : '', { colSpan: 2 }),
            craftCell('Columna', { rowSpan: 4, colSpan: 2, style: 'itemSubtitle', height: 20, orientation: 'vertical' }),
            craftSubtitle('a. Flexibilidad', { colSpan: 10 }),
            craftCell(value.examColumnFlexibility ? 'x' : '', { colSpan: 2 }),
            craftSubtitle('c. Miembros inferiores', { colSpan: 10 }),
            craftCell(value.examLimbLower ? 'x' : '', { colSpan: 2 }),),
        craftRow(
            craftSubtitle('c. Pupilas', { colSpan: 10 }),
            craftCell(value.examEyePupils ? 'x' : '', { colSpan: 2 }),
            craftSubtitle('c. Faringe', { colSpan: 10 }),
            craftCell(value.examPharynxPharynx ? 'x' : '', { colSpan: 2 }),
            craftSubtitle('b. Movilidad', { colSpan: 10 }),
            craftCell(value.examNeckMobility ? 'x' : '', { colSpan: 2 }),
            craftSubtitle('b. Desviación', { colSpan: 10 }),
            craftCell(value.examColumnDeviation ? 'x' : '', { colSpan: 2 }),
            craftCell('Neurológico', { rowSpan: 4, colSpan: 2, style: 'itemSubtitle', height: 45, orientation: 'vertical' }),
            craftSubtitle('a. Fuerza ', { colSpan: 10 }),
            craftCell(value.examNeurologicForce ? 'x' : '', { colSpan: 2 }),),
        craftRow(
            craftSubtitle('d. Córnea', { colSpan: 10 }),
            craftCell(value.examEyeCorneas ? 'x' : '', { colSpan: 2 }),
            craftSubtitle('d. Amígdalas', { colSpan: 10 }),
            craftCell(value.examPharynxTonsils ? 'x' : '', { colSpan: 2 }),
            craftCell('Tórax', { rowSpan: 2, colSpan: 2, style: 'itemSubtitle', height: 20, orientation: 'vertical' }),
            craftSubtitle('a. Mamas', { colSpan: 10 }),
            craftCell(value.examChestBreast ? 'x' : '', { colSpan: 2 }),
            craftSubtitle('c. Dolor', { rowSpan: 2, colSpan: 10 }),
            craftCell(value.examColumnPain ? 'x' : '', { rowSpan: 2, colSpan: 2 }),
            craftSubtitle('b. Sensibilidad', { colSpan: 10 }),
            craftCell(value.examNeurologicSensitivity ? 'x' : '', { colSpan: 2 }),),
        craftRow(
            craftSubtitle('e. Motilidad', { colSpan: 10 }),
            craftCell(value.examEyeMotility ? 'x' : '', { colSpan: 2 }),
            craftSubtitle('e. Dentadura', { colSpan: 10 }),
            craftCell(value.examPharynxTeeth ? 'x' : '', { colSpan: 2 }),
            craftSubtitle('b. Corazón', { colSpan: 10 }),
            craftCell(value.examChestHeart ? 'x' : '', { colSpan: 2 }),
            craftSubtitle('c. Marcha', { colSpan: 10 }),
            craftCell(value.examNeurologicGait ? 'x' : '', { colSpan: 2 }),),
        craftRow(
            craftCell('SI EXISTE EVIDENCIA DE PATOLOGÍA MARCAR CON "X" Y DESCRIBIR EN LA SIGUIENTE SECCIÓN COLOCANDO EL NUMERAL', { colSpan: 56 }),
            craftSubtitle('d. Reflejos', { colSpan: 10 }),
            craftCell(value.examNeurologicReflex ? 'x' : '', { colSpan: 2 }),),
        craftLabel('Observaciones:'),
        ...values.map((e, i) => craftRow(craftCell(e, { colSpan: 70, border: ['left', 'right', values.length - 1 === i ? 'bottom' : 'right'] }))).filter(e => !!e)
    ]
};

export const craftSpecificAndGeneralResults = (value: GeneralExamResultAndSpecific): Row[] => [
    craftRow(
        craftTitle('EXAMEN', { colSpan: 10 }),
        craftTitle('FECHA', { colSpan: 20 }),
        craftTitle('RESULTADOS', { colSpan: 40 }),
    ),
    ...value.generalExamResults.map(e => craftRow(
        craftCell(e.exam, { colSpan: 10 }),
        craftCell(formatDate(e.date, 'yyyy/MM/dd'), { colSpan: 20 }),
        craftCell(e.result, { colSpan: 40 })
    )),
    craftLabel('Observaciones'),
    craftRow(craftCell(value.generalExamObservation, { border: ['left', 'right', 'bottom'], colSpan: 70 }))
];

export const craftDiagnosticHeader = (text?: string): Row => craftRow(
    craftCell(text ?? 'DIAGNÓSTICO', { colSpan: 29, style: 'tableHeader', border: ['bottom', 'top', 'left'] }),
    craftCell('PRE = PRESUNTIVO', { colSpan: 9, fontSize: 6, border: ['bottom', 'top'], style: 'tableHeader' }),
    craftCell('DEF = DEFINITIVO', { colSpan: 9, fontSize: 6, border: ['bottom', 'top'], style: 'tableHeader' }),
    craftCell('CIE', { colSpan: 13, style: 'tableHeader' }),
    craftCell('PRE', { colSpan: 5, style: 'tableHeader' }),
    craftCell('DEF', { colSpan: 5, style: 'tableHeader' }),
);
export const craftMedicalDiagnostic = (values: MedicalDiagnostic[]): Row[] => values.map((e, i) => craftRow(
    craftTitle((i + 1).toString().padStart(2, '0'), { colSpan: 2 }),
    craftCell(e.description, { colSpan: 45 }),
    craftCell(e.cie, { colSpan: 13 }),
    craftCell(e.pre ? 'x' : '', { colSpan: 5 }),
    craftCell(e.def ? 'x' : '', { colSpan: 5 })
))

export const craftMedicalFitnessForJob = (value: MedicalFitnessForJob): Row[] => [
    craftRow(
        craftTitle('APTO', { colSpan: 16 }),
        craftCell(value.medicalFitnessType === 'fit' ? 'x' : '', { colSpan: 2 }),
        craftTitle('APTO EN OBSERVACIÓN', { colSpan: 16 }),
        craftCell(value.medicalFitnessType === 'fit-observation' ? 'x' : '', { colSpan: 2 }),
        craftTitle('APTO CON LIMITACIONES', { colSpan: 15 }),
        craftCell(value.medicalFitnessType === 'fit-limitation' ? 'x' : '', { colSpan: 2 }),
        craftTitle('NO APTO', { colSpan: 15 }),
        craftCell(value.medicalFitnessType === 'no-fit' ? 'x' : '', { colSpan: 2 }),
    ),
    craftRow(
        craftSubtitle('Observación', { colSpan: 16 }),
        craftCell(value.medicalFitnessObservation, { colSpan: 54 }),
    ),
    craftRow(
        craftSubtitle('Limitación', { colSpan: 16 }),
        craftCell(value.medicalFitnessLimitation, { colSpan: 54 }),
    )
];

export const craftRecommendation = (value: RecordRecommendation): Row[] => [
    craftLabel('Descripcion'),
    craftRow(craftCell(value.recommendationDescription, { border: ['left', 'right', 'bottom'], colSpan: 70 }))
];