import { InitialRecord } from "@omega/medical/application/type/initial-record";
import { craftCurrentDisease, craftDiagnosticHeader, craftExtraActivity, craftFamilyHistory, CraftItemFunc, craftJobAccident, craftMedicalAndSurgicalHistory, craftMedicalConsultation, craftMedicalDiagnostic, craftMedicalFitnessForJob, craftOccupationalDisease, craftPhysicalRegionalExam, craftRecommendation, CraftRecordFunc, craftReviewOfOrgansAndSystem, craftSpecificAndGeneralResults, craftToxicHabitsAndLifeStyle, craftVitalSignsAndAnthropometry, flatRecord } from "../generic-record-helper";
import { formatDate } from "date-fns";
import { Cell, craftCell, craftHeader, craftRow, craftSpacing, craftSubtitle, craftTitle, emptyCell, Row } from "../table.helper";

export const createInitialRecord: CraftRecordFunc<InitialRecord> = (record: InitialRecord, { fileNumber }) => flatRecord([
    craftHeader('A. Datos del Establecimiento - Empresa y Usuario'),
    institutionLayout({ ...record, fileNumber }),
    craftRow(craftSpacing({ colSpan: 70 })),
    craftHeader('B. Motivo de Consulta'),
    craftMedicalConsultation(record),
    craftRow(craftSpacing({ colSpan: 70 })),
    craftHeader('C. Antecedentes Personales'),
    craftMedicalAndSurgicalHistory(record),
    gynecologicalHistoryLayout(record.patientGender === 'male' ? undefined : record),
    maleReproducitveHistoryLayout(record.patientGender === 'female' ? undefined : record),
    craftToxicHabitsAndLifeStyle({
        tobacco: { ...record.toxicHabitTobacco },
        alcohol: { ...record.toxicHabitAlcohol },
        other: { ...record.toxicHabitOther },
    }, record),
    craftRow(craftSpacing({ colSpan: 70 })),
    craftHeader('D. Antecedentes de Trabajo'),
    jobHistoryLayout(record),
    craftJobAccident(record),
    craftOccupationalDisease(record),
    craftRow(craftSpacing({ colSpan: 70 })),
    craftHeader('E. Antecedentes Familiares (detallar el parentesco)'),
    craftFamilyHistory(record),
    craftRow(craftSpacing({ colSpan: 70 })),
    craftHeader('F. Factores de Riesgo del Puesto de Trabajo Actual'),
    jobRiskLayout(record),
    craftRow(emptyCell({ colSpan: 70 })),
    jobRiskPreventionLayout(record),
    craftRow(craftSpacing({ colSpan: 70 })),
    craftHeader('G. Actividades Extra Laborales'),
    craftExtraActivity(record),
    craftRow(craftSpacing({ colSpan: 70 })),
    craftHeader('H. Enfermedad Actual'),
    craftCurrentDisease(record),
    craftRow(craftSpacing({ colSpan: 70 })),
    craftHeader('I. Revisión Actual de Órganos y Sistemas'),
    craftReviewOfOrgansAndSystem(record),
    craftRow(craftSpacing({ colSpan: 70 })),
    craftHeader('J. Constantes Vitales y Antropometría'),
    craftVitalSignsAndAnthropometry(record),
    craftRow(craftSpacing({ colSpan: 70 })),
    craftHeader('K. Examen Físico Regional'),
    craftPhysicalRegionalExam(record),
    craftRow(craftSpacing({ colSpan: 70 })),
    craftHeader('L. Resultados de Exámenes Generales y Específicos de Acuerdo al Riesgo y Puesto de Trabajo (imagen, laboratorio y otros)'),
    craftSpecificAndGeneralResults(record),
    craftRow(craftSpacing({ colSpan: 70 })),
    craftDiagnosticHeader("M. Diagnóstico"),
    craftMedicalDiagnostic(record.diagnostics),
    craftRow(craftSpacing({ colSpan: 70 })),
    craftHeader('N. Aptitud Médica para el Trabajo'),
    craftMedicalFitnessForJob(record),
    craftRow(craftSpacing({ colSpan: 70 })),
    craftHeader('O. Recomendaciones y/o Tratamiento'),
    craftRecommendation(record)
]);

const institutionLayout: CraftItemFunc<InitialRecord & {
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
        craftTitle('Primer apellido', { rowSpan: 2, colSpan: 10 }),
        craftTitle('Segundo apellido', { rowSpan: 2, colSpan: 10 }),
        craftTitle('Primer nombre', { rowSpan: 2, colSpan: 10 }),
        craftTitle('Segundo nombre', { rowSpan: 2, colSpan: 10 }),
        craftTitle('Sexo', { rowSpan: 2, colSpan: 3 }),
        craftTitle('Edad (años)', { rowSpan: 2, colSpan: 3 }),
        craftTitle('Religión', { colSpan: 10 }),
        craftTitle('Grupo sanguíneo', { rowSpan: 2, colSpan: 6 }),
        craftTitle('Lateralidad', { rowSpan: 2, colSpan: 8 }),
    ),
    craftRow(
        craftCell('Católica', { orientation: 'vertical', style: 'itemTitle', colSpan: 2, height: 50, fontSize: 5 }),
        craftCell('Evangélica', { orientation: 'vertical', style: 'itemTitle', colSpan: 2, height: 50, fontSize: 5 }),
        craftCell('Testigos de Jehová', { orientation: 'vertical', style: 'itemTitle', colSpan: 2, height: 50, fontSize: 5 }),
        craftCell('Mormona', { orientation: 'vertical', style: 'itemTitle', colSpan: 2, height: 50, fontSize: 5 }),
        craftCell('Otras', { orientation: 'vertical', style: 'itemTitle', colSpan: 2, height: 50, fontSize: 5 }),
    ),
    craftRow(
        craftCell(record.patientLastName, { colSpan: 10 }),
        craftCell(record.patientSecondLastName, { colSpan: 10 }),
        craftCell(record.patientFirstName, { colSpan: 10 }),
        craftCell(record.patientMiddleName, { colSpan: 10 }),
        craftCell(record.patientGender === 'male' ? 'H' : 'M', { colSpan: 3, fontSize: 5 }),
        craftCell(record.patientAge.toString(), { colSpan: 3 }),
        craftCell(record.patientReligion === 'catholic' ? 'x' : '', { colSpan: 2, alignment: 'center', fontSize: 10 }),
        craftCell(record.patientReligion === 'evangelical' ? 'x' : '', { colSpan: 2, alignment: 'center', fontSize: 10 }),
        craftCell(record.patientReligion === 'jehovah\'s witnesses' ? 'x' : '', { colSpan: 2, alignment: 'center', fontSize: 10 }),
        craftCell(record.patientReligion === 'mormon' ? 'x' : '', { colSpan: 2, alignment: 'center', fontSize: 10 }),
        craftCell(record.patientReligion === 'other' ? 'x' : '', { colSpan: 2, alignment: 'center', fontSize: 10 }),
        craftCell(record.patientBloodType, { colSpan: 6 }),
        craftCell(record.patientLaterality === 'right' ? 'Diestro' : 'Zurdo', { colSpan: 8 }),
    ),
    craftRow(
        craftTitle('Orientación sexual', { colSpan: 10 }),
        craftTitle('Identidad de género', { colSpan: 10 }),
        craftTitle('Discapacidad', { colSpan: 13 }),
        craftTitle('Fecha DE Ingreso al trabajo', { rowSpan: 2, colSpan: 5 }),
        craftTitle('Puesto de trabajo (CIUO)', { rowSpan: 2, colSpan: 5 }),
        craftTitle('Área de trabajo', { rowSpan: 2, colSpan: 6 }),
        craftTitle('Actividades relevantes al puesto de trabajo a ocupar', { rowSpan: 2, colSpan: 21 }),
    ),
    craftRow(
        craftCell('Lesbiana', { orientation: 'vertical', style: 'itemTitle', height: 50, fontSize: 5, colSpan: 2 }),
        craftCell('Gay', { orientation: 'vertical', style: 'itemTitle', height: 50, fontSize: 5, colSpan: 2 }),
        craftCell('Bisexual', { orientation: 'vertical', style: 'itemTitle', height: 50, fontSize: 5, colSpan: 2 }),
        craftCell('Heterosexual', { orientation: 'vertical', style: 'itemTitle', height: 50, fontSize: 5, colSpan: 2 }),
        craftCell('No sabe / No responde', { orientation: 'vertical', style: 'itemTitle', height: 50, fontSize: 5, colSpan: 2 }),
        craftCell('Femenino', { orientation: 'vertical', style: 'itemTitle', height: 50, fontSize: 5, colSpan: 2 }),
        craftCell('Masculino', { orientation: 'vertical', style: 'itemTitle', height: 50, fontSize: 5, colSpan: 2 }),
        craftCell('Trans-femenino', { orientation: 'vertical', style: 'itemTitle', height: 50, fontSize: 5, colSpan: 2 }),
        craftCell('Trans-masculino', { orientation: 'vertical', style: 'itemTitle', height: 50, fontSize: 5, colSpan: 2 }),
        craftCell('No sabe / No responde', { orientation: 'vertical', style: 'itemTitle', height: 50, fontSize: 5, colSpan: 2 }),
        craftTitle('Sí', { colSpan: 2 }),
        craftTitle('No', { colSpan: 2 }),
        craftTitle('Tipo', { colSpan: 6 }),
        craftTitle('%', { colSpan: 3 }),
    ),
    craftRow(
        craftCell(record.patientSexualOrientation === 'lesbian' ? 'x' : '', { colSpan: 2, alignment: 'center', fontSize: 10 }),
        craftCell(record.patientSexualOrientation === 'gay' ? 'x' : '', { colSpan: 2, alignment: 'center', fontSize: 10 }),
        craftCell(record.patientSexualOrientation === 'bisexual' ? 'x' : '', { colSpan: 2, alignment: 'center', fontSize: 10 }),
        craftCell(record.patientSexualOrientation === 'heterosexual' ? 'x' : '', { colSpan: 2, alignment: 'center', fontSize: 10 }),
        craftCell(record.patientSexualOrientation === 'unknown' ? 'x' : '', { colSpan: 2, alignment: 'center', fontSize: 10 }),
        craftCell(record.patientGenderIdentity === 'female' ? 'x' : '', { colSpan: 2, alignment: 'center', fontSize: 10 }),
        craftCell(record.patientGenderIdentity === 'male' ? 'x' : '', { colSpan: 2, alignment: 'center', fontSize: 10 }),
        craftCell(record.patientGenderIdentity === 'trans-female' ? 'x' : '', { colSpan: 2, alignment: 'center', fontSize: 10 }),
        craftCell(record.patientGenderIdentity === 'trans-male' ? 'x' : '', { colSpan: 2, alignment: 'center', fontSize: 10 }),
        craftCell(record.patientGenderIdentity === 'unknown' ? 'x' : '', { colSpan: 2, alignment: 'center', fontSize: 10 }),
        craftCell(!!record.patientDisabilityType ? 'x' : '', { colSpan: 2, alignment: 'center', fontSize: 10 }),
        craftCell(!record.patientDisabilityType ? 'x' : '', { colSpan: 2, alignment: 'center', fontSize: 10 }),
        craftCell(record.patientDisabilityType ?? '', { colSpan: 6 }),
        craftCell(record.patientDisabilityPercent?.toString() ?? '', { colSpan: 3 }),
        craftCell(formatDate(record.institutionJobStartDate, 'yyyy/MM/dd'), { colSpan: 5 }),
        craftCell(record.institutionJobPosition, { colSpan: 5 }),
        craftCell(record.institutionJobArea, { colSpan: 6 }),
        craftCell(record.institutionJobActivities, { colSpan: 21 }),
    ),
];

const gynecologicalHistoryLayout = (record: InitialRecord | undefined) => [
    craftRow(craftTitle('Antecedentes Gineco-Obstétricos', { colSpan: 70 })),
    craftRow(
        craftSubtitle('Menarquía', { rowSpan: 2, colSpan: 11 }),
        craftSubtitle('Ciclos', { rowSpan: 2, colSpan: 6 }),
        craftSubtitle('Fecha de última menstruación', { rowSpan: 2, colSpan: 6 }),
        craftSubtitle('Gestas', { rowSpan: 2, colSpan: 4 }),
        craftSubtitle('Partos', { rowSpan: 2, colSpan: 4 }),
        craftSubtitle('Cesáreas', { rowSpan: 2, colSpan: 4 }),
        craftSubtitle('Abortos', { rowSpan: 2, colSpan: 4 }),
        craftSubtitle('Hijos', { colSpan: 8 }),
        craftSubtitle('Vida sexual activa', { colSpan: 8 }),
        craftSubtitle('Método de planificación familiar', { colSpan: 15 }),
    ),
    craftRow(
        craftSubtitle('Vivos', { colSpan: 4 }),
        craftSubtitle('Muertos', { colSpan: 4 }),
        craftSubtitle('Sí', { colSpan: 4 }),
        craftSubtitle('No', { colSpan: 4 }),
        craftSubtitle('Sí', { colSpan: 4 }),
        craftSubtitle('No', { colSpan: 4 }),
        craftSubtitle('Tipo', { colSpan: 7 }),
    ),
    record ? craftRow(
        craftCell(record.gynecologicalMenarche, { colSpan: 11 }),
        craftCell(record.gynecologicalCycle, { colSpan: 6 }),
        craftCell(formatDate(record.gynecologicalLastMenstruationDate, 'yyyy/MM/dd'), { colSpan: 6 }),
        craftCell(record.gynecologicalDeeds.toString() ?? '', { colSpan: 4 }),
        craftCell(record.gynecologicalBirths.toString() ?? '', { colSpan: 4 }),
        craftCell(record.gynecologicalCesarean.toString() ?? '', { colSpan: 4 }),
        craftCell(record.gynecologicalAbortions.toString() ?? '', { colSpan: 4 }),
        craftCell(record.gynecologicalLivingChildren.toString() ?? '', { colSpan: 4 }),
        craftCell(record.gynecologicalDeadChildren.toString() ?? '', { colSpan: 4 }),
        craftCell(record.gynecologicalSexualLife ? 'x' : '', { colSpan: 4, alignment: 'center', fontSize: 10 }),
        craftCell(!record.gynecologicalSexualLife ? 'x' : '', { colSpan: 4, alignment: 'center', fontSize: 10 }),
        craftCell(record.gynecologicalFamilyPlanningType ? 'x' : '', { colSpan: 4, alignment: 'center', fontSize: 10 }),
        craftCell(!record.gynecologicalFamilyPlanningType ? 'x' : '', { colSpan: 4, alignment: 'center', fontSize: 10 }),
        craftCell(record.gynecologicalFamilyPlanningType ?? '', { colSpan: 7 })
    ) : craftRow(
        craftCell('', { colSpan: 11 }),
        craftCell('', { colSpan: 6 }),
        craftCell('', { colSpan: 6 }),
        craftCell('', { colSpan: 4 }),
        craftCell('', { colSpan: 4 }),
        craftCell('', { colSpan: 4 }),
        craftCell('', { colSpan: 4 }),
        craftCell('', { colSpan: 4 }),
        craftCell('', { colSpan: 4 }),
        craftCell('', { colSpan: 4 }),
        craftCell('', { colSpan: 4 }),
        craftCell('', { colSpan: 4 }),
        craftCell('', { colSpan: 4 }),
        craftCell('', { colSpan: 7 })
    ),
    craftRow(
        ...patientHistoryExamHeader({ exam: 12, done: 2, time: 8, result: 11 }),
        ...patientHistoryExamHeader({ exam: 12, done: 2, time: 8, result: 11 }),
    ),
    record
        ? craftRow(
            ...patientHistoryExamLayout({
                exam: 'Papanicolaou',
                done: record.gynecologicalExamPapanicolau.done ?? false,
                time: record.gynecologicalExamPapanicolau.time ?? 0,
                result: record.gynecologicalExamPapanicolau.result ?? ''
            }, { exam: 12, done: 2, time: 8, result: 11 }),
            ...patientHistoryExamLayout({
                exam: 'Eco mamario',
                done: record.gynecologicalExamBreastEcho.done ?? false,
                time: record.gynecologicalExamBreastEcho.time ?? 0,
                result: record.gynecologicalExamBreastEcho.result ?? ''
            }, { exam: 12, done: 2, time: 8, result: 11 }),
        )
        : craftRow(
            craftCell('Papanicolaou', { colSpan: 12 }),
            craftCell('', { colSpan: 2 }),
            craftCell('', { colSpan: 2 }),
            craftCell('', { colSpan: 8 }),
            craftCell('', { colSpan: 11 }),
            craftCell('Eco mamario', { colSpan: 12 }),
            craftCell('', { colSpan: 2 }),
            craftCell('', { colSpan: 2 }),
            craftCell('', { colSpan: 8 }),
            craftCell('', { colSpan: 11 }),
        ),
    record
        ? craftRow(
            ...patientHistoryExamLayout({
                exam: 'Colposcopia',
                done: record.gynecologicalExamColposcopy.done ?? false,
                time: record.gynecologicalExamColposcopy.time ?? 0,
                result: record.gynecologicalExamColposcopy.result ?? ''
            }, { exam: 12, done: 2, time: 8, result: 11 }),
            ...patientHistoryExamLayout({
                exam: 'Mamografía',
                done: record.gynecologicalExamMammography.done ?? false,
                time: record.gynecologicalExamMammography.time ?? 0,
                result: record.gynecologicalExamMammography.result ?? ''
            }, { exam: 12, done: 2, time: 8, result: 11 }),
        )
        : craftRow(
            craftCell('Colposcopia', { colSpan: 12 }),
            craftCell('', { colSpan: 2 }),
            craftCell('', { colSpan: 2 }),
            craftCell('', { colSpan: 8 }),
            craftCell('', { colSpan: 11 }),
            craftCell('Mamografía', { colSpan: 12 }),
            craftCell('', { colSpan: 2 }),
            craftCell('', { colSpan: 2 }),
            craftCell('', { colSpan: 8 }),
            craftCell('', { colSpan: 11 }),
        )
]

const maleReproducitveHistoryLayout = (record: InitialRecord | undefined) => [
    craftRow(craftTitle('Antecedentes reproductivos masculinos', { colSpan: 70 })),
    craftRow(
        ...patientHistoryExamHeader({ exam: 12, done: 2, time: 8, result: 11 }, 2),
        craftSubtitle('Método de planificación familiar', { colSpan: 21 }),
        craftSubtitle('Hijos', { colSpan: 14 }),
    ),
    craftRow(
        craftSubtitle('Sí', { colSpan: 6 }),
        craftSubtitle('No', { colSpan: 6 }),
        craftSubtitle('Tipo', { colSpan: 9 }),
        craftSubtitle('Vivos', { colSpan: 7 }),
        craftSubtitle('Muertos', { colSpan: 7 }),
    ),
    record
        ? craftRow(
            ...patientHistoryExamLayout({
                exam: 'Antígeno prostático',
                done: record.maleReproductiveExamProstateAntigen.done ?? false,
                time: record.maleReproductiveExamProstateAntigen.time ?? 0,
                result: record.maleReproductiveExamProstateAntigen.result ?? ''
            }, { exam: 12, done: 2, time: 8, result: 11 }),
            craftCell(record.maleReproductiveFamilyPlanningType ? 'x' : '', { rowSpan: 2, colSpan: 6, alignment: 'center', fontSize: 10 }),
            craftCell(!record.maleReproductiveFamilyPlanningType ? 'x' : '', { rowSpan: 2, colSpan: 6, alignment: 'center', fontSize: 10 }),
            craftCell(record.maleReproductiveFamilyPlanningType ?? '', { rowSpan: 2, colSpan: 9 }),
            craftCell(record.maleReproductiveFamilyPlanningType ? record.maleReproductiveLivingChildren.toString() : '', { rowSpan: 2, colSpan: 7 }),
            craftCell(record.maleReproductiveFamilyPlanningType ? record.maleReproductiveDeadChildren.toString() : '', { rowSpan: 2, colSpan: 7 }),
        )
        : craftRow(
            craftCell('Antígeno prostático', { colSpan: 12 }),
            craftCell('', { colSpan: 2 }),
            craftCell('', { colSpan: 2 }),
            craftCell('', { colSpan: 8 }),
            craftCell('', { colSpan: 11 }),
            craftCell('', { rowSpan: 2, colSpan: 6 }),
            craftCell('', { rowSpan: 2, colSpan: 6 }),
            craftCell('', { rowSpan: 2, colSpan: 9 }),
            craftCell('', { rowSpan: 2, colSpan: 7 }),
            craftCell('', { rowSpan: 2, colSpan: 7 }),
        ),
    record
        ? craftRow(
            ...patientHistoryExamLayout({
                exam: 'Eco prostático',
                done: record.maleReproductiveExamProstateEcho.done ?? false,
                time: record.maleReproductiveExamProstateEcho.time ?? 0,
                result: record.maleReproductiveExamProstateEcho.result ?? ''
            }, { exam: 12, done: 2, time: 8, result: 11 }),
        )
        : craftRow(
            craftCell('Eco prostático', { colSpan: 12 }),
            craftCell('', { colSpan: 2 }),
            craftCell('', { colSpan: 2 }),
            craftCell('', { colSpan: 8 }),
            craftCell('', { colSpan: 11 }),
        ),
];

const patientHistoryExamHeader = (span: { exam: number, done: number, time: number, result: number }, rowSpan: number = 1): Cell[] => [
    craftSubtitle('Exámenes realizados', { colSpan: span.exam, rowSpan }),
    craftSubtitle('Sí', { colSpan: span.done, rowSpan }),
    craftSubtitle('No', { colSpan: span.done, rowSpan }),
    craftSubtitle('Tiempo', { colSpan: span.time, rowSpan }),
    craftSubtitle('Resultado', { colSpan: span.result, rowSpan }),
];

const patientHistoryExamLayout = (values: { exam: string, done: boolean, time: number, result: string }, span: { exam: number, done: number, time: number, result: number }) => [
    craftCell(values.exam, { colSpan: span.exam }),
    craftCell(values.done ? 'x' : '', { colSpan: span.done, alignment: 'center', fontSize: 10 }),
    craftCell(!values.done ? 'x' : '', { colSpan: span.done, alignment: 'center', fontSize: 10 }),
    craftCell(values.done ? values.time.toString() : '', { colSpan: span.time }),
    craftCell(values.result, { colSpan: span.result }),
];

const jobHistoryLayout: CraftItemFunc<InitialRecord> = (record) => {

    const content: Row[] = record.jobHistory.length ? record.jobHistory.map(e => craftRow(
        craftCell(e.jobHistoryCompany, { colSpan: 12 }),
        craftCell(e.jobHistoryPosition, { colSpan: 10 }),
        craftCell(e.jobHistoryActivity, { colSpan: 15 }),
        craftCell(e.jobHistoryTime.toString(), { colSpan: 6 }),
        craftCell(e.jobHistoryRiskPhysical ? 'x' : ' ', { colSpan: 2, alignment: 'center', fontSize: 10 }),
        craftCell(e.jobHistoryRiskMechanical ? 'x' : ' ', { colSpan: 2, alignment: 'center', fontSize: 10 }),
        craftCell(e.jobHistoryRiskChemical ? 'x' : ' ', { colSpan: 2, alignment: 'center', fontSize: 10 }),
        craftCell(e.jobHistoryRiskBiological ? 'x' : ' ', { colSpan: 2, alignment: 'center', fontSize: 10 }),
        craftCell(e.jobHistoryRiskErgonomic ? 'x' : ' ', { colSpan: 2, alignment: 'center', fontSize: 10 }),
        craftCell(e.jobHistoryRiskPsychosocial ? 'x' : ' ', { colSpan: 2, alignment: 'center', fontSize: 10 }),
        craftCell(e.jobHistoryObservation ?? '', { colSpan: 15 }),
    )) : [craftRow(craftCell('', { colSpan: 70 }))]

    return [
        craftRow(craftTitle('Antecedentes de empleos anteriores', { colSpan: 70 })),
        craftRow(
            craftTitle('Empresa', { rowSpan: 2, colSpan: 12 }),
            craftTitle('Puesto de trabajo', { rowSpan: 2, colSpan: 10 }),
            craftTitle('Actividades que desempeñaba', { rowSpan: 2, colSpan: 15 }),
            craftTitle('Tiempo de trabajo (meses)', { rowSpan: 2, colSpan: 6 }),
            craftTitle('Riesgo', { colSpan: 12 }),
            craftTitle('Observaciones', { rowSpan: 2, colSpan: 15 }),
        ),
        craftRow(
            craftCell('Físico', { orientation: 'vertical', fontSize: 5, colSpan: 2, height: 50, style: 'itemTitle' }),
            craftCell('Mecánico', { orientation: 'vertical', fontSize: 5, colSpan: 2, height: 50, style: 'itemTitle' }),
            craftCell('Químico', { orientation: 'vertical', fontSize: 5, colSpan: 2, height: 50, style: 'itemTitle' }),
            craftCell('Biológico', { orientation: 'vertical', fontSize: 5, colSpan: 2, height: 50, style: 'itemTitle' }),
            craftCell('Ergonómico', { orientation: 'vertical', fontSize: 5, colSpan: 2, height: 50, style: 'itemTitle' }),
            craftCell('Psicosocial', { orientation: 'vertical', fontSize: 5, colSpan: 2, height: 50, style: 'itemTitle' }),
        ),
        ...content
    ];
}

const jobRiskLayout: CraftItemFunc<InitialRecord> = (record) => [
    craftRow(
        craftTitle('Puesto de trabajo / Área', { rowSpan: 2, colSpan: 17 }),
        craftTitle('Actividades', { rowSpan: 2, colSpan: 19 }),
        craftTitle('Físico', { colSpan: 10 }),
        craftTitle('Mecánico', { colSpan: 15 }),
        craftTitle('Químico', { colSpan: 9 }),
    ),
    craftRow(
        craftCell('Temperaturas altas', { height: 150, orientation: 'vertical', style: 'itemTitle' }),
        craftCell('Temperaturas bajas', { height: 150, orientation: 'vertical', style: 'itemTitle' }),
        craftCell('Radiación Ionizante', { height: 150, orientation: 'vertical', style: 'itemTitle' }),
        craftCell('Radiación No Ionizante', { height: 150, orientation: 'vertical', style: 'itemTitle' }),
        craftCell('Ruido', { height: 150, orientation: 'vertical', style: 'itemTitle' }),
        craftCell('Vibración', { height: 150, orientation: 'vertical', style: 'itemTitle' }),
        craftCell('Iluminación', { height: 150, orientation: 'vertical', style: 'itemTitle' }),
        craftCell('Ventilación', { height: 150, orientation: 'vertical', style: 'itemTitle' }),
        craftCell('Fluido eléctrico', { height: 150, orientation: 'vertical', style: 'itemTitle' }),
        craftCell('Otros', { height: 150, orientation: 'vertical', style: 'itemTitle' }),

        craftCell('Atrapamiento entre máquinas', { height: 150, orientation: 'vertical', style: 'itemTitle' }),
        craftCell('Atrapamiento entre superficies', { height: 150, orientation: 'vertical', style: 'itemTitle' }),
        craftCell('Atrapamiento entre objetos', { height: 150, orientation: 'vertical', style: 'itemTitle' }),
        craftCell('Caída de objetos', { height: 150, orientation: 'vertical', style: 'itemTitle' }),
        craftCell('Caídas al mismo nivel', { height: 150, orientation: 'vertical', style: 'itemTitle' }),
        craftCell('Caídas a diferente nivel', { height: 150, orientation: 'vertical', style: 'itemTitle' }),
        craftCell('Contacto eléctrico', { height: 150, orientation: 'vertical', style: 'itemTitle' }),
        craftCell('Contacto con superficies de trabajos', { height: 150, orientation: 'vertical', style: 'itemTitle' }),
        craftCell('Proyección de partículas - fragmentos', { height: 150, orientation: 'vertical', style: 'itemTitle' }),
        craftCell('Proyección de fluidos', { height: 150, orientation: 'vertical', style: 'itemTitle' }),
        craftCell('Pinchazos', { height: 150, orientation: 'vertical', style: 'itemTitle' }),
        craftCell('Cortes', { height: 150, orientation: 'vertical', style: 'itemTitle' }),
        craftCell('Atropellamientos por vehículos', { height: 150, orientation: 'vertical', style: 'itemTitle' }),
        craftCell('Choques / Colisión vehicular', { height: 150, orientation: 'vertical', style: 'itemTitle' }),
        craftCell('Otros', { height: 150, orientation: 'vertical', style: 'itemTitle' }),

        craftCell('Sólidos', { height: 150, orientation: 'vertical', style: 'itemTitle' }),
        craftCell('Polvos', { height: 150, orientation: 'vertical', style: 'itemTitle' }),
        craftCell('Humos', { height: 150, orientation: 'vertical', style: 'itemTitle' }),
        craftCell('Líquidos', { height: 150, orientation: 'vertical', style: 'itemTitle' }),
        craftCell('Vapores', { height: 150, orientation: 'vertical', style: 'itemTitle' }),
        craftCell('Aerosoles', { height: 150, orientation: 'vertical', style: 'itemTitle' }),
        craftCell('Neblinas', { height: 150, orientation: 'vertical', style: 'itemTitle' }),
        craftCell('Gaseosos', { height: 150, orientation: 'vertical', style: 'itemTitle' }),
        craftCell('Otros', { height: 150, orientation: 'vertical', style: 'itemTitle' }),
    ),
    ...record.jobRisks.map((e, i) => craftRow(
        craftCell((i + 1).toString().padStart(2, '0'), { colSpan: 2 }),
        craftCell(e.name, { colSpan: 15 }),
        craftCell(e.activity, { colSpan: 19 }),
        craftCell(e.physicalRiskHighTemperature ? 'x' : '', { alignment: 'center', fontSize: 10 }),
        craftCell(e.physicalRiskLowTemperature ? 'x' : '', { alignment: 'center', fontSize: 10 }),
        craftCell(e.physicalRiskIonicRadiation ? 'x' : '', { alignment: 'center', fontSize: 10 }),
        craftCell(e.physicalRiskNonIonicRadiation ? 'x' : '', { alignment: 'center', fontSize: 10 }),
        craftCell(e.physicalRiskNoise ? 'x' : '', { alignment: 'center', fontSize: 10 }),
        craftCell(e.physicalRiskVibration ? 'x' : '', { alignment: 'center', fontSize: 10 }),
        craftCell(e.physicalRiskIllumination ? 'x' : '', { alignment: 'center', fontSize: 10 }),
        craftCell(e.physicalRiskVentilation ? 'x' : '', { alignment: 'center', fontSize: 10 }),
        craftCell(e.physicalRiskElectricFluid ? 'x' : '', { alignment: 'center', fontSize: 10 }),
        craftCell(e.physicalRiskOther ? 'x' : '', { alignment: 'center', fontSize: 10 }),
        craftCell(e.mechanicRiskEntrapmentBetweenMachines ? 'x' : '', { alignment: 'center', fontSize: 10 }),
        craftCell(e.mechanicRiskTrappingBetweenSurfaces ? 'x' : '', { alignment: 'center', fontSize: 10 }),
        craftCell(e.mechanicRiskEntrapmentBetweenObjects ? 'x' : '', { alignment: 'center', fontSize: 10 }),
        craftCell(e.mechanicRiskObjectFalling ? 'x' : '', { alignment: 'center', fontSize: 10 }),
        craftCell(e.mechanicRiskSameLevelFalling ? 'x' : '', { alignment: 'center', fontSize: 10 }),
        craftCell(e.mechanicRiskDifferentLevelFalling ? 'x' : '', { alignment: 'center', fontSize: 10 }),
        craftCell(e.mechanicRiskElectricContact ? 'x' : '', { alignment: 'center', fontSize: 10 }),
        craftCell(e.mechanicRiskSurfacesContact ? 'x' : '', { alignment: 'center', fontSize: 10 }),
        craftCell(e.mechanicRiskParticlesProjection ? 'x' : '', { alignment: 'center', fontSize: 10 }),
        craftCell(e.mechanicRiskFluidProjection ? 'x' : '', { alignment: 'center', fontSize: 10 }),
        craftCell(e.mechanicRiskJab ? 'x' : '', { alignment: 'center', fontSize: 10 }),
        craftCell(e.mechanicRiskCut ? 'x' : '', { alignment: 'center', fontSize: 10 }),
        craftCell(e.mechanicRiskHitByVehicles ? 'x' : '', { alignment: 'center', fontSize: 10 }),
        craftCell(e.mechanicRiskVehicleCollision ? 'x' : '', { alignment: 'center', fontSize: 10 }),
        craftCell(e.mechanicRiskOther ? 'x' : '', { alignment: 'center', fontSize: 10 }),
        craftCell(e.chemicalRiskSolid ? 'x' : '', { alignment: 'center', fontSize: 10 }),
        craftCell(e.chemicalRiskDust ? 'x' : '', { alignment: 'center', fontSize: 10 }),
        craftCell(e.chemicalRiskSmoke ? 'x' : '', { alignment: 'center', fontSize: 10 }),
        craftCell(e.chemicalRiskLiquid ? 'x' : '', { alignment: 'center', fontSize: 10 }),
        craftCell(e.chemicalRiskSteam ? 'x' : '', { alignment: 'center', fontSize: 10 }),
        craftCell(e.chemicalRiskAerosol ? 'x' : '', { alignment: 'center', fontSize: 10 }),
        craftCell(e.chemicalRiskMist ? 'x' : '', { alignment: 'center', fontSize: 10 }),
        craftCell(e.chemicalRiskGas ? 'x' : '', { alignment: 'center', fontSize: 10 }),
        craftCell(e.chemicalRiskOther ? 'x' : '', { alignment: 'center', fontSize: 10 }),
    ))
];

const jobRiskPreventionLayout: CraftItemFunc<InitialRecord> = (record) => [
    craftRow(
        craftTitle('Puesto de trabajo / Área', { rowSpan: 2, colSpan: 13 }),
        craftTitle('Actividades', { rowSpan: 2, colSpan: 13 }),
        craftTitle('Biológico', { colSpan: 7 }),
        craftTitle('Ergonómico', { colSpan: 5 }),
        craftTitle('Psicosocial', { colSpan: 13 }),
        craftTitle('Medidas preventivas', { rowSpan: 2, colSpan: 19 }),
    ),
    craftRow(
        craftCell('Virus', { height: 175, orientation: 'vertical', style: 'itemTitle' }),
        craftCell('Hongos', { height: 175, orientation: 'vertical', style: 'itemTitle' }),
        craftCell('Bacterias', { height: 175, orientation: 'vertical', style: 'itemTitle' }),
        craftCell('Parásitos', { height: 175, orientation: 'vertical', style: 'itemTitle' }),
        craftCell('Exposición a vectores', { height: 175, orientation: 'vertical', style: 'itemTitle' }),
        craftCell('Exposición a animales selváticos', { height: 175, orientation: 'vertical', style: 'itemTitle' }),
        craftCell('Otros', { height: 175, orientation: 'vertical', style: 'itemTitle' }),

        craftCell('Manejo manual de cargas', { height: 175, orientation: 'vertical', style: 'itemTitle' }),
        craftCell('Movimiento repetitivos', { height: 175, orientation: 'vertical', style: 'itemTitle' }),
        craftCell('Posturas forzadas', { height: 175, orientation: 'vertical', style: 'itemTitle' }),
        craftCell('Trabajos con PVD', { height: 175, orientation: 'vertical', style: 'itemTitle' }),
        craftCell('Otros', { height: 175, orientation: 'vertical', style: 'itemTitle' }),

        craftCell('Monotonía del trabajo', { height: 175, orientation: 'vertical', style: 'itemTitle' }),
        craftCell('Sobrecarga laboral', { height: 175, orientation: 'vertical', style: 'itemTitle' }),
        craftCell('Minuciosidad de la tarea', { height: 175, orientation: 'vertical', style: 'itemTitle' }),
        craftCell('Alta responsabilidad', { height: 175, orientation: 'vertical', style: 'itemTitle' }),
        craftCell('Autonomía  en la toma de decisiones', { height: 175, orientation: 'vertical', style: 'itemTitle' }),
        craftCell('Supervisión y estilos de dirección deficiente', { height: 175, orientation: 'vertical', style: 'itemTitle' }),
        craftCell('Conflicto de rol', { height: 175, orientation: 'vertical', style: 'itemTitle' }),
        craftCell('Falta de claridad en las funciones', { height: 175, orientation: 'vertical', style: 'itemTitle' }),
        craftCell('Incorrecta distribución del trabajo', { height: 175, orientation: 'vertical', style: 'itemTitle' }),
        craftCell('Turnos rotativos', { height: 175, orientation: 'vertical', style: 'itemTitle' }),
        craftCell('Relaciones interpersonales', { height: 175, orientation: 'vertical', style: 'itemTitle' }),
        craftCell('Inestabilidad laboral', { height: 175, orientation: 'vertical', style: 'itemTitle' }),
        craftCell('Otros', { height: 175, orientation: 'vertical', style: 'itemTitle' }),
    ),
    ...record.jobRisks.map((e, i) => craftRow(
        craftCell((i + 1).toString().padStart(2, '0'), { colSpan: 2 }),
        craftCell(e.name, { colSpan: 11 }),
        craftCell(e.activity, { colSpan: 13 }),
        craftCell(e.biologicalRiskVirus ? 'x' : '', { alignment: 'center', fontSize: 10 }),
        craftCell(e.biologicalRiskFungus ? 'x' : '', { alignment: 'center', fontSize: 10 }),
        craftCell(e.biologicalRiskBacteria ? 'x' : '', { alignment: 'center', fontSize: 10 }),
        craftCell(e.biologicalRiskParasites ? 'x' : '', { alignment: 'center', fontSize: 10 }),
        craftCell(e.biologicalRiskExposureToVectors ? 'x' : '', { alignment: 'center', fontSize: 10 }),
        craftCell(e.biologicalRiskExposureToWildlifeAnimals ? 'x' : '', { alignment: 'center', fontSize: 10 }),
        craftCell(e.biologicalRiskOther ? 'x' : '', { alignment: 'center', fontSize: 10 }),
        craftCell(e.ergonomicRiskManualHandlingLoads ? 'x' : '', { alignment: 'center', fontSize: 10 }),
        craftCell(e.ergonomicRiskRepetitiveMoves ? 'x' : '', { alignment: 'center', fontSize: 10 }),
        craftCell(e.ergonomicRiskForcedPostures ? 'x' : '', { alignment: 'center', fontSize: 10 }),
        craftCell(e.ergonomicRiskWorkWithPvd ? 'x' : '', { alignment: 'center', fontSize: 10 }),
        craftCell(e.ergonomicRiskOther ? 'x' : '', { alignment: 'center', fontSize: 10 }),
        craftCell(e.psychosocialRiskMonotony ? 'x' : '', { alignment: 'center', fontSize: 10 }),
        craftCell(e.psychosocialRiskWorkOverload ? 'x' : '', { alignment: 'center', fontSize: 10 }),
        craftCell(e.psychosocialRiskThoroughnessOfTheTask ? 'x' : '', { alignment: 'center', fontSize: 10 }),
        craftCell(e.psychosocialRiskHighResponsibility ? 'x' : '', { alignment: 'center', fontSize: 10 }),
        craftCell(e.psychosocialRiskTakingResponsibilityAutonomy ? 'x' : '', { alignment: 'center', fontSize: 10 }),
        craftCell(e.psychosocialRiskSupervision ? 'x' : '', { alignment: 'center', fontSize: 10 }),
        craftCell(e.psychosocialRiskRoleConflict ? 'x' : '', { alignment: 'center', fontSize: 10 }),
        craftCell(e.psychosocialRiskNonFunctionClarify ? 'x' : '', { alignment: 'center', fontSize: 10 }),
        craftCell(e.psychosocialRiskBadWorkDistribution ? 'x' : '', { alignment: 'center', fontSize: 10 }),
        craftCell(e.psychosocialRiskRotativeShift ? 'x' : '', { alignment: 'center', fontSize: 10 }),
        craftCell(e.psychosocialRiskIntrapersonalRelations ? 'x' : '', { alignment: 'center', fontSize: 10 }),
        craftCell(e.psychosocialRiskJobInstability ? 'x' : '', { alignment: 'center', fontSize: 10 }),
        craftCell(e.psychosocialRiskOther ? 'x' : '', { alignment: 'center', fontSize: 10 }),
        craftCell(e.preventiveMeasure, { colSpan: 19 }),
    ))
];