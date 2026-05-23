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

const isInitialRecord = (record: Omit<GenericRecord, 'authorFullname' | 'authorDni'>): record is InitialRecord => record.type === 'inicial';
const isPeriodicRecord = (record: Omit<GenericRecord, 'authorFullname' | 'authorDni'>): record is PeriodicRecord => record.type === 'periodico';
const isReintegrateRecord = (record: Omit<GenericRecord, 'authorFullname' | 'authorDni'>): record is ReintegrateRecord => record.type === 'reintegrar';
const isRetirementRecord = (record: Omit<GenericRecord, 'authorFullname' | 'authorDni'>): record is RetirementRecord => record.type === 'retiro';
const isCertificateRecord = (record: Omit<GenericRecord, 'authorFullname' | 'authorDni'>): record is CertificateRecord => record.type === 'certificado';

type RecordOption = {
    fileNumber: number;
}
export type CraftItemFunc<T extends Omit<GenericRecord, 'authorFullname' | 'authorDni'>> = (record: T) => Row[];
export type CraftRecordFunc<T extends Omit<GenericRecord, 'authorFullname' | 'authorDni'>> = (record: T, option: RecordOption) => Row[];
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
    craftLabel('Descripción'),
    craftRow(craftCell(value.medicalConsultationDescription, { border: ['left', 'right', 'bottom'], colSpan: 70 }))
]

export const craftMedicalAndSurgicalHistory = (value: MedicalAndSurgicalHistory): Row[] => [
    craftRow(craftTitle('Antecedentes clínicos y quirúrgicos', { colSpan: 70 })),
    craftLabel('Descripción'),
    craftRow(craftCell(value.medicalAndSurgicalHistory, { border: ['left', 'right', 'bottom'], colSpan: 70 })),
]


const craftToxicHabit = (data: Partial<ToxicDetail>): Cell[] => [
    craftCell(data.name ?? '', { colSpan: 12 }),
    craftCell(data.haveConsume ? 'x' : '', { colSpan: 2, alignment: 'center', fontSize: 10 }),
    craftCell(!data.haveConsume ? 'x' : '', { colSpan: 2, alignment: 'center', fontSize: 10 }),
    craftCell(data.haveConsume ? data.consumptionTime?.toString() ?? '' : '', { colSpan: 5 }),
    craftCell(data.haveConsume ? data.quantity?.toString() ?? '' : '', { colSpan: 4 }),
    craftCell(data.haveConsume ? data.isExConsumer ? 'Si' : 'No' : '', { colSpan: 4 }),
    craftCell(data.haveConsume ? data.timeOfAbstinence?.toString() ?? '' : '', { colSpan: 6 }),
];

export const craftToxicHabitsAndLifeStyle = (toxic: { tobacco: Partial<ToxicDetail>, alcohol: Partial<ToxicDetail>, other: Partial<ToxicDetail> }, life: LifeStyle): Row[] => [
    craftRow(
        craftTitle('Hábitos tóxicos', { colSpan: 35 }),
        craftTitle('Estilo de vida', { colSpan: 35 }),
    ),
    craftRow(
        craftSubtitle('Consumos nocivos', { colSpan: 12 }),
        craftSubtitle('Sí', { colSpan: 2 }),
        craftSubtitle('No', { colSpan: 2 }),
        craftSubtitle('Tiempo de consumo (meses)', { colSpan: 5 }),
        craftSubtitle('Cantidad', { colSpan: 4 }),
        craftSubtitle('Ex consumidor', { colSpan: 4 }),
        craftSubtitle('Tiempo de abstinencia (meses)', { colSpan: 6 }),

        craftSubtitle('Estilo', { colSpan: 10 }),
        craftSubtitle('Sí', { colSpan: 2 }),
        craftSubtitle('No', { colSpan: 2 }),
        craftSubtitle('¿Cuál?', { colSpan: 17 }),
        craftSubtitle('Tiempo / Cantidad', { colSpan: 4 }),
    ),
    craftRow(
        ...craftToxicHabit({ ...toxic.tobacco, name: 'Tabaco' }),

        craftCell('Actividad física', { colSpan: 10 }),
        life.lifestylePhysicalActivity !== undefined ? craftCell(life.lifestylePhysicalActivity ? 'x' : '', { colSpan: 2, alignment: 'center', fontSize: 10 }) : craftCell('', { colSpan: 2 }),
        life.lifestylePhysicalActivity !== undefined ? craftCell(!life.lifestylePhysicalActivity ? 'x' : '', { colSpan: 2, alignment: 'center', fontSize: 10 }) : craftCell('', { colSpan: 2 }),
        craftCell(life.lifestylePhysicalActivityType ?? '', { colSpan: 17 }),
        craftCell(life.lifestylePhysicalActivityTimeQty ?? '', { colSpan: 4 }),
    ),
    craftRow(
        ...craftToxicHabit({ ...toxic.alcohol, name: 'Alcohol' }),

        craftCell('Medicación habitual', { rowSpan: 2, colSpan: 10 }),
        life.lifestyleMedication !== undefined ? craftCell(life.lifestyleMedication ? 'x' : '', { rowSpan: 2, colSpan: 2, alignment: 'center', fontSize: 10 }) : craftCell('', { rowSpan: 2, colSpan: 2 }),
        life.lifestyleMedication !== undefined ? craftCell(!life.lifestyleMedication ? 'x' : '', { rowSpan: 2, colSpan: 2, alignment: 'center', fontSize: 10 }) : craftCell('', { rowSpan: 2, colSpan: 2 }),
        craftCell(life.lifestyleMedicationName ?? '', { rowSpan: 2, colSpan: 17 }),
        craftCell(life.lifestyleMedicationTimeQty ?? '', { rowSpan: 2, colSpan: 4 }),
    ),
    craftRow(
        ...craftToxicHabit({ ...toxic.other, name: `Otras drogas: ${toxic.other.name ?? ''}` })
    )
];

export const craftJobAccident = (value: JobAccident): Row[] => [
    craftRow(craftTitle('Accidentes de trabajo (descripción)', { colSpan: 70 })),
    craftRow(emptyCell({ colSpan: 70, border: ['top', 'left', 'right'] })),
    craftRow(
        craftCell('¿Fue calificado por el instituto de seguridad social correspondiente?:', { border: ['left'], colSpan: 30 }),
        craftCell('Sí', { border: [], colSpan: 2 }),
        craftCell(value.jobAccidentHappened ? 'x' : '', { alignment: 'center', fontSize: 10 }),
        craftCell('Especificar: ', { border: [], colSpan: 4 }),
        craftCell(value.jobAccidentDescription ?? '_____________', { border: [], colSpan: 14 }),
        craftCell('No', { border: [], colSpan: 2 }),
        craftCell(!value.jobAccidentHappened ? 'x' : '', { alignment: 'center', fontSize: 10 }),
        craftCell('Fecha:', { border: [], colSpan: 4 }),
        craftCell(value.jobAccidentDate && value.jobAccidentHappened ? formatDate(value.jobAccidentDate, 'yyyy') : '', { colSpan: 3 }),
        craftCell(value.jobAccidentDate && value.jobAccidentHappened ? formatDate(value.jobAccidentDate, 'MM') : '', { colSpan: 3 }),
        craftCell(value.jobAccidentDate && value.jobAccidentHappened ? formatDate(value.jobAccidentDate, 'dd') : '', { colSpan: 3 }),
        emptyCell({ border: ['right'], colSpan: 3 })
    ),
    craftRow(emptyCell({ colSpan: 70, border: ['bottom', 'left', 'right'] })),
    craftLabel('Observaciones:'),
    craftRow(
        craftCell(value.jobAccidentObservation ?? '', { colSpan: 70, border: ['bottom', "left", 'right'] })
    ),
];

export const craftOccupationalDisease = (value: OccupationalDisease): Row[] => [
    craftRow(craftTitle('Enfermedades profesionales', { colSpan: 70 })),
    craftRow(emptyCell({ colSpan: 70, border: ['top', 'left', 'right'] })),
    craftRow(
        craftCell('¿Fue calificado por el instituto de seguridad social correspondiente?:', { border: ['left'], colSpan: 30 }),
        craftCell('Sí', { border: [], colSpan: 2 }),
        craftCell(value.occupationalDiseaseHappened ? 'x' : '', { alignment: 'center', fontSize: 10 }),
        craftCell('Especificar: ', { border: [], colSpan: 4 }),
        craftCell(value.occupationalDiseaseDescription ?? '_____________', { border: [], colSpan: 14 }),
        craftCell('No', { border: [], colSpan: 2 }),
        craftCell(!value.occupationalDiseaseHappened ? 'x' : '', { alignment: 'center', fontSize: 10 }),
        craftCell('Fecha:', { border: [], colSpan: 4 }),
        craftCell(value.occupationalDiseaseDate && value.occupationalDiseaseHappened ? formatDate(value.occupationalDiseaseDate, 'yyyy') : '', { colSpan: 3 }),
        craftCell(value.occupationalDiseaseDate && value.occupationalDiseaseHappened ? formatDate(value.occupationalDiseaseDate, 'MM') : '', { colSpan: 3 }),
        craftCell(value.occupationalDiseaseDate && value.occupationalDiseaseHappened ? formatDate(value.occupationalDiseaseDate, 'dd') : '', { colSpan: 3 }),
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
        !!value.familyHistoryCardioVascular ? `1. ${value.familyHistoryCardioVascular}` : undefined,
        !!value.familyHistoryMetabolic ? `2. ${value.familyHistoryMetabolic}` : undefined,
        !!value.familyHistoryNeurologic ? `3. ${value.familyHistoryNeurologic}` : undefined,
        !!value.familyHistoryOncologic ? `4. ${value.familyHistoryOncologic}` : undefined,
        !!value.familyHistoryInfectious ? `5. ${value.familyHistoryInfectious}` : undefined,
        !!value.familyHistoryHereditary ? `6. ${value.familyHistoryHereditary}` : undefined,
        !!value.familyHistoryDisability ? `7. ${value.familyHistoryDisability}` : undefined,
        !!value.familyHistoryOther ? `8. ${value.familyHistoryOther}` : undefined
    ].filter(e => e !== undefined);

    return [
        craftRow(
            craftTitle('1. Enfermedad cardiovascular', { colSpan: 7 }),
            craftCell(value.familyHistoryCardioVascular ? 'x' : '', { colSpan: 2, alignment: 'center', fontSize: 10 }),
            craftTitle('2. Enfermedad metabólica', { colSpan: 7 }),
            craftCell(value.familyHistoryMetabolic ? 'x' : '', { colSpan: 2, alignment: 'center', fontSize: 10 }),
            craftTitle('3. Enfermedad neurológica', { colSpan: 7 }),
            craftCell(value.familyHistoryNeurologic ? 'x' : '', { colSpan: 2, alignment: 'center', fontSize: 10 }),
            craftTitle('4. Enfermedad oncológica', { colSpan: 7 }),
            craftCell(value.familyHistoryOncologic ? 'x' : '', { colSpan: 2, alignment: 'center', fontSize: 10 }),
            craftTitle('5. Enfermedad infecciosa', { colSpan: 7 }),
            craftCell(value.familyHistoryInfectious ? 'x' : '', { colSpan: 2, alignment: 'center', fontSize: 10 }),
            craftTitle('6. Enfermedad hereditaria / congénita', { colSpan: 7 }),
            craftCell(value.familyHistoryHereditary ? 'x' : '', { colSpan: 2, alignment: 'center', fontSize: 10 }),
            craftTitle('7. Discapacidades', { colSpan: 6 }),
            craftCell(value.familyHistoryDisability ? 'x' : '', { colSpan: 2, alignment: 'center', fontSize: 10 }),
            craftTitle('8. Otros', { colSpan: 6 }),
            craftCell(value.familyHistoryOther ? 'x' : '', { colSpan: 2, alignment: 'center', fontSize: 10 }),
        ),
        craftLabel('Observaciones:'),
        ...(values.length ? values : ["Ninguna"]).map((e, i) => craftRow(craftCell(e, { colSpan: 70, border: ['left', 'right', !values.length || values.length - 1 === i ? 'bottom' : 'right'] }))).filter(e => !!e)
    ];
};

export const craftExtraActivity = (value: ExtraActivity): Row[] => [
    craftLabel('Observaciones:'),
    craftRow(craftCell(value.extraActivityDescription ? value.extraActivityDescription : 'Ninguna', { border: ['left', 'right', 'bottom'], colSpan: 70 }))
];


export const craftCurrentDisease = (value: CurrentDisease): Row[] => [
    craftLabel('Observaciones:'),
    craftRow(craftCell(!!value?.currentDiseaseDescription ? value.currentDiseaseDescription : 'No REFIERE', { border: ['left', 'right', 'bottom'], colSpan: 70 }))
];

export const craftReviewOfOrgansAndSystem = (value: ReviewOfOrgansAndSystem): Row[] => {

    const values: string[] = [
        !!value.reviewOfOrgansSkin ? `1. ${value.reviewOfOrgansSkin}` : undefined,
        !!value.reviewOfOrgansSenseOrgans ? `2. ${value.reviewOfOrgansSenseOrgans}` : undefined,
        !!value.reviewOfOrgansBreath ? `3. ${value.reviewOfOrgansBreath}` : undefined,
        !!value.reviewOfOrgansCardiovascular ? `4. ${value.reviewOfOrgansCardiovascular}` : undefined,
        !!value.reviewOfOrgansDigestive ? `5. ${value.reviewOfOrgansDigestive}` : undefined,
        !!value.reviewOfOrgansUrinary ? `6. ${value.reviewOfOrgansUrinary}` : undefined,
        !!value.reviewOfOrgansSkeletalMuscle ? `7. ${value.reviewOfOrgansSkeletalMuscle}` : undefined,
        !!value.reviewOfOrgansEndocrinic ? `8. ${value.reviewOfOrgansEndocrinic}` : undefined,
        !!value.reviewOfOrgansHemoLymphatic ? `9. ${value.reviewOfOrgansHemoLymphatic}` : undefined,
        !!value.reviewOfOrgansHighlyStrung ? `10. ${value.reviewOfOrgansHighlyStrung}` : undefined,
    ].filter(e => e !== undefined);

    return [
        craftRow(
            craftSubtitle('1. Piel y anexos', { colSpan: 12 }),
            craftCell(value.reviewOfOrgansSkin ? 'x' : ' ', { colSpan: 2, alignment: 'center', fontSize: 10 }),
            craftSubtitle('2. Respiratorio', { colSpan: 12 }),
            craftCell(value.reviewOfOrgansBreath ? 'x' : ' ', { colSpan: 2, alignment: 'center', fontSize: 10 }),
            craftSubtitle('3. Digestivo', { colSpan: 12 }),
            craftCell(value.reviewOfOrgansDigestive ? 'x' : ' ', { colSpan: 2, alignment: 'center', fontSize: 10 }),
            craftSubtitle('4. Músculo-esquelético', { colSpan: 12 }),
            craftCell(value.reviewOfOrgansSkeletalMuscle ? 'x' : ' ', { colSpan: 2, alignment: 'center', fontSize: 10 }),
            craftSubtitle('5. Hemo-linfático', { colSpan: 12 }),
            craftCell(value.reviewOfOrgansHemoLymphatic ? 'x' : ' ', { colSpan: 2, alignment: 'center', fontSize: 10 }),
        ),
        craftRow(
            craftSubtitle('6. Órganos de los sentidos', { colSpan: 12 }),
            craftCell(value.reviewOfOrgansSenseOrgans ? 'x' : ' ', { colSpan: 2, alignment: 'center', fontSize: 10 }),
            craftSubtitle('7. cardiovascular', { colSpan: 12 }),
            craftCell(value.reviewOfOrgansCardiovascular ? 'x' : ' ', { colSpan: 2, alignment: 'center', fontSize: 10 }),
            craftSubtitle('8. Genitourinario', { colSpan: 12 }),
            craftCell(value.reviewOfOrgansUrinary ? 'x' : ' ', { colSpan: 2, alignment: 'center', fontSize: 10 }),
            craftSubtitle('9. Endocrino', { colSpan: 12 }),
            craftCell(value.reviewOfOrgansEndocrinic ? 'x' : ' ', { colSpan: 2, alignment: 'center', fontSize: 10 }),
            craftSubtitle('10. Nervioso', { colSpan: 12 }),
            craftCell(value.reviewOfOrgansHighlyStrung ? 'x' : ' ', { colSpan: 2, alignment: 'center', fontSize: 10 }),
        ),
        craftLabel('Observaciones:'),
        ...(values.length ? values : ['Sin patología aparente'])
            .map((e, i) => craftRow(craftCell(e, { colSpan: 70, border: ['left', 'right', !values.length || values.length - 1 === i ? 'bottom' : 'right'] })))
            .filter(e => !!e)
    ];
};

export const craftVitalSignsAndAnthropometry = (value: VitalSignsAndAnthropometry): Row[] => [
    craftRow(
        craftTitle('Presión arterial (mmHg)', { colSpan: 8 }),
        craftTitle('Temperatura (°C)', { colSpan: 8 }),
        craftTitle('Frecuencia cardíaca (lat/min)', { colSpan: 8 }),
        craftTitle('Saturación de oxígeno (O₂ %)', { colSpan: 8 }),
        craftTitle('Frecuencia respiratoria (fr/min)', { colSpan: 8 }),
        craftTitle('Peso (kg)', { colSpan: 8 }),
        craftTitle('Talla (cm)', { colSpan: 8 }),
        craftTitle('Índice de masa corporal (kg/m²)', { colSpan: 7 }),
        craftTitle('Perímetro abdominal (cm)', { colSpan: 7 }),
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
        !!value.examSkinScar ? `1a. ${value.examSkinScar}` : undefined,
        !!value.examSkinTattoo ? `1b. ${value.examSkinTattoo}` : undefined,
        !!value.examSkinLesions ? `1c. ${value.examSkinLesions}` : undefined,
        !!value.examEyeEyelids ? `2a. ${value.examEyeEyelids}` : undefined,
        !!value.examEyeConjunctiva ? `2b. ${value.examEyeConjunctiva}` : undefined,
        !!value.examEyePupils ? `2c. ${value.examEyePupils}` : undefined,
        !!value.examEyeCorneas ? `2d. ${value.examEyeCorneas}` : undefined,
        !!value.examEyeMotility ? `2e. ${value.examEyeMotility}` : undefined,
        !!value.examEarAuditoryExternal ? `3a. ${value.examEarAuditoryExternal}` : undefined,
        !!value.examEarAuricle ? `3b. ${value.examEarAuricle}` : undefined,
        !!value.examEarEardrum ? `3c. ${value.examEarEardrum}` : undefined,
        !!value.examPharynxLips ? `4a. ${value.examPharynxLips}` : undefined,
        !!value.examPharynxTongue ? `4b. ${value.examPharynxTongue}` : undefined,
        !!value.examPharynxPharynx ? `4c. ${value.examPharynxPharynx}` : undefined,
        !!value.examPharynxTonsils ? `4d. ${value.examPharynxTonsils}` : undefined,
        !!value.examPharynxTeeth ? `4e. ${value.examPharynxTeeth}` : undefined,
        !!value.examNosePartition ? `5a. ${value.examNosePartition}` : undefined,
        !!value.examNoseTurbinates ? `5b. ${value.examNoseTurbinates}` : undefined,
        !!value.examNoseMucousMembranes ? `5c. ${value.examNoseMucousMembranes}` : undefined,
        !!value.examNoseParanasalSinuses ? `5d. ${value.examNoseParanasalSinuses}` : undefined,
        !!value.examNeckThyroid ? `6a. ${value.examNeckThyroid}` : undefined,
        !!value.examNeckMobility ? `6b. ${value.examNeckMobility}` : undefined,
        !!value.examChestBreast ? `7a. ${value.examChestBreast}` : undefined,
        !!value.examChestHeart ? `7b. ${value.examChestHeart}` : undefined,
        !!value.examChestLungs ? `8a. ${value.examChestLungs}` : undefined,
        !!value.examChestRibCage ? `8b. ${value.examChestRibCage}` : undefined,
        !!value.examAbdomenViscera ? `9a. ${value.examAbdomenViscera}` : undefined,
        !!value.examAbdomenAbdominalWall ? `9b. ${value.examAbdomenAbdominalWall}` : undefined,
        !!value.examColumnFlexibility ? `10a. ${value.examColumnFlexibility}` : undefined,
        !!value.examColumnDeviation ? `10b. ${value.examColumnDeviation}` : undefined,
        !!value.examColumnPain ? `10c. ${value.examColumnPain}` : undefined,
        !!value.examPelvis ? `11a. ${value.examPelvis}` : undefined,
        !!value.examPelvisGenitals ? `11b. ${value.examPelvisGenitals}` : undefined,
        !!value.examLimbVascular ? `12a. ${value.examLimbVascular}` : undefined,
        !!value.examLimbUpper ? `12b. ${value.examLimbUpper}` : undefined,
        !!value.examLimbLower ? `12c. ${value.examLimbLower}` : undefined,
        !!value.examNeurologicForce ? `13a. ${value.examNeurologicForce}` : undefined,
        !!value.examNeurologicSensitivity ? `13b. ${value.examNeurologicSensitivity}` : undefined,
        !!value.examNeurologicGait ? `13c. ${value.examNeurologicGait}` : undefined,
        !!value.examNeurologicReflex ? `13d. ${value.examNeurologicReflex}` : undefined,
    ].filter(e => e !== undefined);

    return [
        craftRow(craftTitle('Regiones', { colSpan: 70 })),
        craftRow(
            craftCell('1. Piel', { rowSpan: 3, colSpan: 2, style: 'itemSubtitle', fontSize: 4, height: 20, orientation: 'vertical' }),
            craftSubtitle('a. Cicatrices', { colSpan: 10 }),
            craftCell(value.examSkinScar ? 'x' : '', { colSpan: 2, alignment: 'center', fontSize: 10 }),
            craftCell('3. Oído', { rowSpan: 3, colSpan: 2, style: 'itemSubtitle', fontSize: 4, height: 20, orientation: 'vertical' }),
            craftSubtitle('a. C. auditivo externo', { colSpan: 10 }),
            craftCell(value.examEarAuditoryExternal ? 'x' : '', { colSpan: 2, alignment: 'center', fontSize: 10 }),
            craftCell('5. Nariz', { rowSpan: 4, colSpan: 2, style: 'itemSubtitle', fontSize: 4, height: 20, orientation: 'vertical' }),
            craftSubtitle('a. Tabique', { colSpan: 10 }),
            craftCell(value.examNosePartition ? 'x' : '', { colSpan: 2, alignment: 'center', fontSize: 10 }),
            craftCell('8. Tórax', { rowSpan: 2, colSpan: 2, style: 'itemSubtitle', fontSize: 4, height: 20, orientation: 'vertical' }),
            craftSubtitle('a. Pulmones', { colSpan: 10 }),
            craftCell(value.examChestLungs ? 'x' : '', { colSpan: 2, alignment: 'center', fontSize: 10 }),
            craftCell('11. Pelvis', { rowSpan: 2, colSpan: 2, style: 'itemSubtitle', fontSize: 4, height: 20, orientation: 'vertical' }),
            craftSubtitle('a. Pelvis', { colSpan: 10 }),
            craftCell(value.examPelvis ? 'x' : '', { colSpan: 2, alignment: 'center', fontSize: 10 })),
        craftRow(
            craftSubtitle('b. Tatuajes', { colSpan: 10 }),
            craftCell(value.examSkinTattoo ? 'x' : '', { colSpan: 2, alignment: 'center', fontSize: 10 }),
            craftSubtitle('b. Pabellón', { colSpan: 10 }),
            craftCell(value.examEarAuricle ? 'x' : '', { colSpan: 2, alignment: 'center', fontSize: 10 }),
            craftSubtitle('b. Cornetes', { colSpan: 10 }),
            craftCell(value.examNoseTurbinates ? 'x' : '', { colSpan: 2, alignment: 'center', fontSize: 10 }),
            craftSubtitle('b. Parrilla Costal', { colSpan: 10 }),
            craftCell(value.examChestRibCage ? 'x' : '', { colSpan: 2, alignment: 'center', fontSize: 10 }),
            craftSubtitle('b. Genitales', { colSpan: 10 }),
            craftCell(value.examPelvisGenitals ? 'x' : '', { colSpan: 2, alignment: 'center', fontSize: 10 })),
        craftRow(
            craftSubtitle('c. Piel y Faneras', { colSpan: 10 }),
            craftCell(value.examSkinLesions ? 'x' : '', { colSpan: 2, alignment: 'center', fontSize: 10 }),
            craftSubtitle('c. Tímpanos', { colSpan: 10 }),
            craftCell(value.examEarEardrum ? 'x' : '', { colSpan: 2, alignment: 'center', fontSize: 10 }),
            craftSubtitle('c. Mucosas', { colSpan: 10 }),
            craftCell(value.examNoseMucousMembranes ? 'x' : '', { colSpan: 2, alignment: 'center', fontSize: 10 }),
            craftCell('9. Abdomen', { rowSpan: 2, colSpan: 2, style: 'itemSubtitle', fontSize: 4, height: 20, orientation: 'vertical' }),
            craftSubtitle('a. Vísceras', { colSpan: 10 }),
            craftCell(value.examAbdomenViscera ? 'x' : '', { colSpan: 2, alignment: 'center', fontSize: 10 }),
            craftCell('12. Extremidades', { rowSpan: 3, colSpan: 2, style: 'itemSubtitle', fontSize: 4, height: 30, orientation: 'vertical' }),
            craftSubtitle('a. Vascular', { colSpan: 10 }),
            craftCell(value.examLimbVascular ? 'x' : '', { colSpan: 2, alignment: 'center', fontSize: 10 })),
        craftRow(
            craftCell('2. Ojos', { rowSpan: 5, colSpan: 2, style: 'itemSubtitle', fontSize: 4, height: 20, orientation: 'vertical' }),
            craftSubtitle('a. Párpados', { colSpan: 10 }),
            craftCell(value.examEyeEyelids ? 'x' : '', { colSpan: 2, alignment: 'center', fontSize: 10 }),
            craftCell('4. Oro faringe', { rowSpan: 5, colSpan: 2, style: 'itemSubtitle', fontSize: 4, height: 45, orientation: 'vertical' }),
            craftSubtitle('a. Labios', { colSpan: 10 }),
            craftCell(value.examPharynxLips ? 'x' : '', { colSpan: 2, alignment: 'center', fontSize: 10 }),
            craftSubtitle('d. Senos paranasales', { colSpan: 10 }),
            craftCell(value.examNoseParanasalSinuses ? 'x' : '', { colSpan: 2, alignment: 'center', fontSize: 10 }),
            craftSubtitle('b. Pared abdominal', { colSpan: 10 }),
            craftCell(value.examAbdomenAbdominalWall ? 'x' : '', { colSpan: 2, alignment: 'center', fontSize: 10 }),
            craftSubtitle('b. Miembros superiores', { colSpan: 10 }),
            craftCell(value.examLimbUpper ? 'x' : '', { colSpan: 2, alignment: 'center', fontSize: 10 })),
        craftRow(
            craftSubtitle('b. Conjuntivas', { colSpan: 10 }),
            craftCell(value.examEyeConjunctiva ? 'x' : '', { colSpan: 2, alignment: 'center', fontSize: 10 }),
            craftSubtitle('b. Lengua', { colSpan: 10 }),
            craftCell(value.examPharynxTongue ? 'x' : '', { colSpan: 2, alignment: 'center', fontSize: 10 }),
            craftCell('6. Cuello', { rowSpan: 2, colSpan: 2, style: 'itemSubtitle', fontSize: 4, height: 20, orientation: 'vertical' }),
            craftSubtitle('a. Tiroides / masas', { colSpan: 10 }),
            craftCell(value.examNeckThyroid ? 'x' : '', { colSpan: 2, alignment: 'center', fontSize: 10 }),
            craftCell('10. Columna', { rowSpan: 4, colSpan: 2, style: 'itemSubtitle', fontSize: 4, height: 20, orientation: 'vertical' }),
            craftSubtitle('a. Flexibilidad', { colSpan: 10 }),
            craftCell(value.examColumnFlexibility ? 'x' : '', { colSpan: 2, alignment: 'center', fontSize: 10 }),
            craftSubtitle('c. Miembros inferiores', { colSpan: 10 }),
            craftCell(value.examLimbLower ? 'x' : '', { colSpan: 2, alignment: 'center', fontSize: 10 })),
        craftRow(
            craftSubtitle('c. Pupilas', { colSpan: 10 }),
            craftCell(value.examEyePupils ? 'x' : '', { colSpan: 2, alignment: 'center', fontSize: 10 }),
            craftSubtitle('c. Faringe', { colSpan: 10 }),
            craftCell(value.examPharynxPharynx ? 'x' : '', { colSpan: 2, alignment: 'center', fontSize: 10 }),
            craftSubtitle('b. Movilidad', { colSpan: 10 }),
            craftCell(value.examNeckMobility ? 'x' : '', { colSpan: 2, alignment: 'center', fontSize: 10 }),
            craftSubtitle('b. Desviación', { colSpan: 10 }),
            craftCell(value.examColumnDeviation ? 'x' : '', { colSpan: 2, alignment: 'center', fontSize: 10 }),
            craftCell('13. Neurológico', { rowSpan: 4, colSpan: 2, style: 'itemSubtitle', fontSize: 4, height: 45, orientation: 'vertical' }),
            craftSubtitle('a. Fuerza ', { colSpan: 10 }),
            craftCell(value.examNeurologicForce ? 'x' : '', { colSpan: 2, alignment: 'center', fontSize: 10 })),
        craftRow(
            craftSubtitle('d. Córnea', { colSpan: 10 }),
            craftCell(value.examEyeCorneas ? 'x' : '', { colSpan: 2, alignment: 'center', fontSize: 10 }),
            craftSubtitle('d. Amígdalas', { colSpan: 10 }),
            craftCell(value.examPharynxTonsils ? 'x' : '', { colSpan: 2, alignment: 'center', fontSize: 10 }),
            craftCell('7. Tórax', { rowSpan: 2, colSpan: 2, style: 'itemSubtitle', fontSize: 4, height: 20, orientation: 'vertical' }),
            craftSubtitle('a. Mamas', { colSpan: 10 }),
            craftCell(value.examChestBreast ? 'x' : '', { colSpan: 2, alignment: 'center', fontSize: 10 }),
            craftSubtitle('c. Dolor', { rowSpan: 2, colSpan: 10 }),
            craftCell(value.examColumnPain ? 'x' : '', { rowSpan: 2, colSpan: 2 }),
            craftSubtitle('b. Sensibilidad', { colSpan: 10 }),
            craftCell(value.examNeurologicSensitivity ? 'x' : '', { colSpan: 2, alignment: 'center', fontSize: 10 })),
        craftRow(
            craftSubtitle('e. Motilidad', { colSpan: 10 }),
            craftCell(value.examEyeMotility ? 'x' : '', { colSpan: 2, alignment: 'center', fontSize: 10 }),
            craftSubtitle('e. Dentadura', { colSpan: 10 }),
            craftCell(value.examPharynxTeeth ? 'x' : '', { colSpan: 2, alignment: 'center', fontSize: 10 }),
            craftSubtitle('b. Corazón', { colSpan: 10 }),
            craftCell(value.examChestHeart ? 'x' : '', { colSpan: 2, alignment: 'center', fontSize: 10 }),
            craftSubtitle('c. Marcha', { colSpan: 10 }),
            craftCell(value.examNeurologicGait ? 'x' : '', { colSpan: 2, alignment: 'center', fontSize: 10 })),
        craftRow(
            craftCell('Si existe evidencia de patología, marcar con "X" y describir en la siguiente sección colocando el numeral', { colSpan: 56 }),
            craftSubtitle('d. Reflejos', { colSpan: 10 }),
            craftCell(value.examNeurologicReflex ? 'x' : '', { colSpan: 2, alignment: 'center', fontSize: 10 })),
        craftLabel('Observaciones:'),
        ...(values.length ? values : ['Examen físico normal']).map((e, i) => craftRow(craftCell(e, { colSpan: 70, border: ['left', 'right', !values.length || values.length - 1 === i ? 'bottom' : 'right'] }))).filter(e => !!e)
    ]
};

export const craftSpecificAndGeneralResults = (value: GeneralExamResultAndSpecific): Row[] => [
    craftRow(
        craftTitle('Examen', { colSpan: 10 }),
        craftTitle('Fecha', { colSpan: 20 }),
        craftTitle('Resultados', { colSpan: 40 }),
    ),
    ...value.generalExamResults.map(e => craftRow(
        craftCell(e.exam, { colSpan: 10 }),
        craftCell(formatDate(e.date, 'yyyy/MM/dd'), { colSpan: 20 }),
        craftCell(e.result, { colSpan: 40 })
    )),
    craftLabel('Observaciones'),
    craftRow(craftCell(value.generalExamObservation ?? '', { border: ['left', 'right', 'bottom'], colSpan: 70 }))
];

export const craftDiagnosticHeader = (text?: string): Row => craftRow(
    craftCell(text ?? 'Diagnóstico', { colSpan: 29, style: 'tableHeader', border: ['bottom', 'top', 'left'] }),
    craftCell('PRE = Presuntivo', { colSpan: 9, fontSize: 6, border: ['bottom', 'top'], style: 'tableHeader' }),
    craftCell('DEF = Definitivo', { colSpan: 9, fontSize: 6, border: ['bottom', 'top'], style: 'tableHeader' }),
    craftCell('CIE', { colSpan: 13, style: 'tableHeader' }),
    craftCell('PRE', { colSpan: 5, style: 'tableHeader' }),
    craftCell('DEF', { colSpan: 5, style: 'tableHeader' }),
);
export const craftMedicalDiagnostic = (values: MedicalDiagnostic[]): Row[] => values.map((e, i) => craftRow(
    craftTitle((i + 1).toString().padStart(2, '0'), { colSpan: 2 }),
    craftCell(e.description, { colSpan: 45 }),
    craftCell(e.cie, { colSpan: 13 }),
    craftCell(e.flag === 'pre' ? 'x' : '', { colSpan: 5, alignment: 'center', fontSize: 10 }),
    craftCell(e.flag === 'def' ? 'x' : '', { colSpan: 5, alignment: 'center', fontSize: 10 })
))

const defaultMedicalFitnessForJobOptions: { showReubication: boolean, hideLimitation: boolean } = {
    showReubication: false,
    hideLimitation: false
}
export const craftMedicalFitnessForJob = (value: MedicalFitnessForJob, options?: Partial<{ showReubication: boolean, hideLimitation: boolean }>): Row[] => {
    const checkedOptions = { ...defaultMedicalFitnessForJobOptions, ...options };

    return [
        craftRow(
            craftTitle('Apto', { colSpan: 16 }),
            craftCell(value.medicalFitnessType === 'fit' ? 'x' : '', { colSpan: 2, alignment: 'center', fontSize: 10 }),
            craftTitle('Apto en observación', { colSpan: 16 }),
            craftCell(value.medicalFitnessType === 'fit-observation' ? 'x' : '', { colSpan: 2, alignment: 'center', fontSize: 10 }),
            craftTitle('Apto con limitaciones', { colSpan: 15 }),
            craftCell(value.medicalFitnessType === 'fit-limitation' ? 'x' : '', { colSpan: 2, alignment: 'center', fontSize: 10 }),
            craftTitle('No apto', { colSpan: 15 }),
            craftCell(value.medicalFitnessType === 'no-fit' ? 'x' : '', { colSpan: 2, alignment: 'center', fontSize: 10 }),
        ),
        craftRow(
            craftSubtitle('Observación', { colSpan: 16 }),
            craftCell(value.medicalFitnessObservation ?? '', { colSpan: 54 }),
        ),
        checkedOptions.hideLimitation ? undefined : craftRow(
            craftSubtitle('Limitación', { colSpan: 16 }),
            craftCell(value.medicalFitnessLimitation ?? '', { colSpan: 54 }),
        ),
        checkedOptions.showReubication
            ? craftRow(
                craftSubtitle('Reubicación', { colSpan: 16 }),
                craftCell(value.medicalFitnessReubication ?? '', { colSpan: 54 }),
            )
            : undefined
    ].filter(e => !!e);
}

export const craftRecommendation = (value: RecordRecommendation): Row[] => [
    craftLabel('Descripción'),
    craftRow(craftCell(value.recommendationDescription, { border: ['left', 'right', 'bottom'], colSpan: 70 }))
];