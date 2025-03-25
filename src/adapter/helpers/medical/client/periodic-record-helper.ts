import { craftCurrentDisease, craftDiagnosticHeader, craftFamilyHistory, CraftItemFunc, craftJobAccident, craftLabel, craftMedicalAndSurgicalHistory, craftMedicalConsultation, craftMedicalDiagnostic, craftMedicalFitnessForJob, craftOccupationalDisease, craftPhysicalRegionalExam, craftRecommendation, CraftRecordFunc, craftReviewOfOrgansAndSystem, craftSpecificAndGeneralResults, craftToxicHabitsAndLifeStyle, craftVitalSignsAndAnthropometry, flatRecord } from "./generic-record-helper";
import { PeriodicRecord } from "@omega/medical/application/type/periodic-record";
import { craftCell, craftHeader, craftRow, craftSpacing, craftTitle, emptyCell, Row } from "./table.helper";

export const createPeriodicRecord: CraftRecordFunc<PeriodicRecord> = (record: PeriodicRecord, { clinicNumber, fileNumber }) => flatRecord([
    craftHeader('DATOS DEL ESTABLECIMIENTO - EMPRESA Y USUARIO'),
    institutionLayout({ ...record, clinicNumber, fileNumber }),
    craftRow(craftSpacing({ colSpan: 70 })),
    craftHeader('MOTIVO DE CONSULTA'),
    craftMedicalConsultation(record),
    craftHeader('ANTECEDENTES PERSONALES'),
    craftMedicalAndSurgicalHistory(record),
    craftToxicHabitsAndLifeStyle({
        tobacco: { ...record.toxicHabitTobacco },
        alcohol: { ...record.toxicHabitAlcohol },
        other: { ...record.toxicHabitOther },
    }, record),
    craftMedicalIncident(record),
    craftJobAccident(record),
    craftOccupationalDisease(record),
    craftHeader('ANTECEDENTES FAMILIARES (DETALLAR EL PARENTESCO)'),
    craftFamilyHistory(record),
    craftHeader('FACTORES DE RIESGOS DEL PUESTO DE TRABAJO'),
    jobRiskLayout(record),
    craftRow(emptyCell({ colSpan: 70 })),
    jobRiskPreventionLayout(record),
    craftHeader('ENFERMEDAD ACTUAL'),
    craftCurrentDisease(record),
    craftHeader('REVISIÓN ACTUAL DE ÓRGANOS Y SISTEMAS'),
    craftReviewOfOrgansAndSystem(record),
    craftRow(craftSpacing({ colSpan: 70 })),
    craftHeader('CONSTANTES VITALES Y ANTROPOMETRÍA'),
    craftVitalSignsAndAnthropometry(record),
    craftRow(craftSpacing({ colSpan: 70 })),
    craftHeader('EXAMEN FÍSICO REGIONAL'),
    craftPhysicalRegionalExam(record),
    craftRow(craftSpacing({ colSpan: 70 })),
    craftHeader('RESULTADOS DE EXÁMENES GENERALES Y ESPECÍFICOS DE ACUERDO AL RIESGO Y PUESTO DE TRABAJO (IMAGEN, LABORATORIO Y OTROS)'),
    craftSpecificAndGeneralResults(record),
    craftRow(craftSpacing({ colSpan: 70 })),
    craftDiagnosticHeader(),
    craftMedicalDiagnostic(record.diagnostics),
    craftRow(craftSpacing({ colSpan: 70 })),
    craftHeader('APTITUD MÉDICA PARA EL TRABAJO'),
    craftMedicalFitnessForJob(record),
    craftRow(craftSpacing({ colSpan: 70 })),
    craftHeader('RECOMENDACIONES Y/O TRATAMIENTO'),
    craftRecommendation(record)
]);

const institutionLayout: CraftItemFunc<PeriodicRecord & {
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
        craftTitle('PRIMER APELLIDO', { colSpan: 13 }),
        craftTitle('SEGUNDO APELLIDO', { colSpan: 13 }),
        craftTitle('PRIMER NOMBRE', { colSpan: 13 }),
        craftTitle('SEGUNDO NOMBRE', { colSpan: 13 }),
        craftTitle('SEXO', { colSpan: 5 }),
        craftTitle('PUESTO DE TRABAJO (CIUO)', { colSpan: 13 }),
    ),
    craftRow(
        craftCell(record.patientLastName, { colSpan: 13 }),
        craftCell(record.patientSecondLastName, { colSpan: 13 }),
        craftCell(record.patientFirstName, { colSpan: 13 }),
        craftCell(record.patientMiddleName, { colSpan: 13 }),
        craftCell(record.patientGender === 'male' ? 'Masculino' : 'Femenino', { colSpan: 5, fontSize: 5 }),
        craftCell(record.jobPosition, { colSpan: 13 }),
    ),
];

export const craftMedicalIncident: CraftItemFunc<PeriodicRecord> = (record): Row[] => [
    craftRow(craftTitle('INCIDENTES', { colSpan: 70 })),
    craftLabel('Describir los principales incidentes suscitados'),
    craftRow(craftCell(record.medicalConsultationDescription, { border: ['left', 'right', 'bottom'], colSpan: 70 }))
]

const jobRiskLayout: CraftItemFunc<PeriodicRecord> = (record) => [
    craftRow(
        craftTitle('PUESTO DE TRABAJO / ÁREA', { rowSpan: 2, colSpan: 9 }),
        craftTitle('ACTIVIDADES', { rowSpan: 2, colSpan: 10 }),
        craftTitle('TIEMPO DE TRABAJO (MESES)', { rowSpan: 2, colSpan: 5 }),
        craftTitle('FISICO', { colSpan: 10 }),
        craftTitle('MECÁNICO', { colSpan: 15 }),
        craftTitle('QUÍMICO', { colSpan: 9 }),
        craftTitle('BIOLÓGICO', { colSpan: 7 }),
        craftTitle('ERGONÓMICO', { colSpan: 5 }),
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

        craftCell('Virus', { height: 150, orientation: 'vertical', style: 'itemTitle' }),
        craftCell('Hongos', { height: 150, orientation: 'vertical', style: 'itemTitle' }),
        craftCell('Bacterias', { height: 150, orientation: 'vertical', style: 'itemTitle' }),
        craftCell('Parásitos', { height: 150, orientation: 'vertical', style: 'itemTitle' }),
        craftCell('Exposición a vectores', { height: 150, orientation: 'vertical', style: 'itemTitle' }),
        craftCell('Exposición a animales selváticos', { height: 150, orientation: 'vertical', style: 'itemTitle' }),
        craftCell('Otros', { height: 150, orientation: 'vertical', style: 'itemTitle' }),

        craftCell('Manejo manual de cargas', { height: 150, orientation: 'vertical', style: 'itemTitle' }),
        craftCell('Movimiento repetitivos', { height: 150, orientation: 'vertical', style: 'itemTitle' }),
        craftCell('Posturas forzadas', { height: 150, orientation: 'vertical', style: 'itemTitle' }),
        craftCell('Trabajos con PVD', { height: 150, orientation: 'vertical', style: 'itemTitle' }),
        craftCell('Otros', { height: 150, orientation: 'vertical', style: 'itemTitle' }),
    ),
    ...record.jobRisks.map((e, i) => craftRow(
        craftCell((i + 1).toString().padStart(2, '0'), { colSpan: 2 }),
        craftCell(e.name, { colSpan: 7 }),
        craftCell(e.activity, { colSpan: 10 }),
        craftCell(e.months.toString(), { colSpan: 5 }),
        craftCell(e.physicalRiskHighTemperature ? 'x' : ''),
        craftCell(e.physicalRiskLowTemperature ? 'x' : ''),
        craftCell(e.physicalRiskIonicRadiation ? 'x' : ''),
        craftCell(e.physicalRiskNonIonicRadiation ? 'x' : ''),
        craftCell(e.physicalRiskNoise ? 'x' : ''),
        craftCell(e.physicalRiskVibration ? 'x' : ''),
        craftCell(e.physicalRiskIllumination ? 'x' : ''),
        craftCell(e.physicalRiskVentilation ? 'x' : ''),
        craftCell(e.physicalRiskElectricFluid ? 'x' : ''),
        craftCell(e.physicalRiskOther ? 'x' : ''),
        craftCell(e.mechanicRiskEntrapmentBetweenMachines ? 'x' : ''),
        craftCell(e.mechanicRiskTrappingBetweenSurfaces ? 'x' : ''),
        craftCell(e.mechanicRiskEntrapmentBetweenObjects ? 'x' : ''),
        craftCell(e.mechanicRiskObjectFalling ? 'x' : ''),
        craftCell(e.mechanicRiskSameLevelFalling ? 'x' : ''),
        craftCell(e.mechanicRiskDifferentLevelFalling ? 'x' : ''),
        craftCell(e.mechanicRiskElectricContact ? 'x' : ''),
        craftCell(e.mechanicRiskSurfacesContact ? 'x' : ''),
        craftCell(e.mechanicRiskParticlesProjection ? 'x' : ''),
        craftCell(e.mechanicRiskFluidProjection ? 'x' : ''),
        craftCell(e.mechanicRiskJab ? 'x' : ''),
        craftCell(e.mechanicRiskCut ? 'x' : ''),
        craftCell(e.mechanicRiskHitByVehicles ? 'x' : ''),
        craftCell(e.mechanicRiskVehicleCollision ? 'x' : ''),
        craftCell(e.mechanicRiskOther ? 'x' : ''),
        craftCell(e.chemicalRiskSolid ? 'x' : ''),
        craftCell(e.chemicalRiskDust ? 'x' : ''),
        craftCell(e.chemicalRiskSmoke ? 'x' : ''),
        craftCell(e.chemicalRiskLiquid ? 'x' : ''),
        craftCell(e.chemicalRiskSteam ? 'x' : ''),
        craftCell(e.chemicalRiskAerosol ? 'x' : ''),
        craftCell(e.chemicalRiskMist ? 'x' : ''),
        craftCell(e.chemicalRiskGas ? 'x' : ''),
        craftCell(e.chemicalRiskOther ? 'x' : ''),
        craftCell(e.biologicalRiskVirus ? 'x' : ''),
        craftCell(e.biologicalRiskFungus ? 'x' : ''),
        craftCell(e.biologicalRiskBacteria ? 'x' : ''),
        craftCell(e.biologicalRiskParasites ? 'x' : ''),
        craftCell(e.biologicalRiskExposureToVectors ? 'x' : ''),
        craftCell(e.biologicalRiskExposureToWildlifeAnimals ? 'x' : ''),
        craftCell(e.biologicalRiskOther ? 'x' : ''),
        craftCell(e.ergonomicRiskManualHandlingLoads ? 'x' : ''),
        craftCell(e.ergonomicRiskRepetitiveMoves ? 'x' : ''),
        craftCell(e.ergonomicRiskForcedPostures ? 'x' : ''),
        craftCell(e.ergonomicRiskWorkWithPvd ? 'x' : ''),
        craftCell(e.ergonomicRiskOther ? 'x' : ''),
    ))
];

const jobRiskPreventionLayout: CraftItemFunc<PeriodicRecord> = (record) => [
    craftRow(
        craftTitle('PUESTO DE TRABAJO / ÁREA', { rowSpan: 2, colSpan: 15 }),
        craftTitle('ACTIVIDADES', { rowSpan: 2, colSpan: 18 }),
        craftTitle('TIEMPO DE TRABAJO (MESES)', { rowSpan: 2, colSpan: 5 }),
        craftTitle('PSICOSOCIAL', { colSpan: 13 }),
        craftTitle('MEDIDAS PREVENTIVAS', { rowSpan: 2, colSpan: 19 }),
    ),
    craftRow(
        craftCell('Monotonía del trabajo', { height: 175, orientation: 'vertical', style: 'itemTitle' }),
        craftCell('Sobrecarga laboral', { height: 175, orientation: 'vertical', style: 'itemTitle' }),
        craftCell('Minuciosidad de la tarea', { height: 175, orientation: 'vertical', style: 'itemTitle' }),
        craftCell('Alta responsabilidad', { height: 175, orientation: 'vertical', style: 'itemTitle' }),
        craftCell('Autonomía  en la toma de decisiones', { height: 175, orientation: 'vertical', style: 'itemTitle' }),
        craftCell('Supervisión y estilos de dirección deficiente', { height: 175, orientation: 'vertical', style: 'itemTitle' }),
        craftCell('Conflicto de rol', { height: 175, orientation: 'vertical', style: 'itemTitle' }),
        craftCell('Falta de Claridad en las funciones', { height: 175, orientation: 'vertical', style: 'itemTitle' }),
        craftCell('Incorrecta distribución del trabajo', { height: 175, orientation: 'vertical', style: 'itemTitle' }),
        craftCell('Turnos rotativos', { height: 175, orientation: 'vertical', style: 'itemTitle' }),
        craftCell('Relaciones interpersonales', { height: 175, orientation: 'vertical', style: 'itemTitle' }),
        craftCell('Inestabilidad laboral', { height: 175, orientation: 'vertical', style: 'itemTitle' }),
        craftCell('Otros', { height: 175, orientation: 'vertical', style: 'itemTitle' }),
    ),
    ...record.jobRiskWithPreventiveMeasure.map((e, i) => craftRow(
        craftCell((i + 1).toString().padStart(2, '0'), { colSpan: 2 }),
        craftCell(e.name, { colSpan: 13 }),
        craftCell(e.activity, { colSpan: 18 }),
        craftCell(e.months.toString(), { colSpan: 5 }),
        craftCell(e.psychosocialRiskMonotony ? 'x' : ''),
        craftCell(e.psychosocialRiskWorkOverload ? 'x' : ''),
        craftCell(e.psychosocialRiskThoroughnessOfTheTask ? 'x' : ''),
        craftCell(e.psychosocialRiskHighResponsibility ? 'x' : ''),
        craftCell(e.psychosocialRiskTakingResponsibilityAutonomy ? 'x' : ''),
        craftCell(e.psychosocialRiskSupervision ? 'x' : ''),
        craftCell(e.psychosocialRiskRoleConflict ? 'x' : ''),
        craftCell(e.psychosocialRiskNonFunctionClarify ? 'x' : ''),
        craftCell(e.psychosocialRiskBadWorkDistribution ? 'x' : ''),
        craftCell(e.psychosocialRiskRotativeShift ? 'x' : ''),
        craftCell(e.psychosocialRiskIntrapersonalRelations ? 'x' : ''),
        craftCell(e.psychosocialRiskJobInstability ? 'x' : ''),
        craftCell(e.psychosocialRiskOther ? 'x' : ''),
        craftCell(e.preventiveMeasure, { colSpan: 19 }),
    ))
]

/* export const createPeriodicRecord: CraftRecordFunc<PeriodicRecord> = (record: PeriodicRecord, {
    clinicNumber,
    fileNumber,
    headerLayout: header,
    subheaderLayout: subheader
}) => [
        header('DATOS DEL ESTABLECIMIENTO - EMPRESA Y USUARIO'),
        institutionLayout({ ...record, clinicNumber, fileNumber }, subheader),
        craftSpacing(),
        header('MOTIVO DE CONSULTA'),
        craftMedicalConsultation(record),
        craftSpacing(),
        header('ANTECEDENTES PERSONALES'),
        craftMedicalAndSurgicalHistory(record, subheader),
        craftToxicHabits([
            { ...record.toxicHabitTobacco, name: 'Tabaco' },
            { ...record.toxicHabitTobacco, name: 'Alcohol' },
            { ...record.toxicHabitTobacco, name: 'other' },
        ].filter(e => !!e), subheader),
        craftMedicalIncident(record, subheader),
        craftJobAccident(record, subheader),
        craftOccupationalDisease(record, subheader),
        craftSpacing(),
        header('ANTECEDENTES FAMILIARES (DETALLAR EL PARENTESCO)'),
        craftFamilyHistory(record, subheader),
        craftSpacing(),
        header('FACTORES DE RIESGOS DEL PUESTO DE TRABAJO'),
        jobRiskLayout(record, subheader),
        jobRiskPreventionLayout(record, subheader),
        craftSpacing(),
        header('ENFERMEDAD ACTUAL'),
        craftCurrentDisease(record),
        craftSpacing(),
        header('REVISIÓN ACTUAL DE ÓRGANOS Y SISTEMAS'),
        craftReviewOfOrgansAndSystem(record),
        craftSpacing(),
        header('CONSTANTES VITALES Y ANTROPOMETRÍA'),
        craftVitalSignsAndAnthropometry(record, subheader),
        craftSpacing(),
        header('EXAMEN FÍSICO REGIONAL'),
        craftPhysicalRegionalExam(record, subheader),
        craftSpacing(),
        header('RESULTADOS DE EXÁMENES GENERALES Y ESPECÍFICOS DE ACUERDO AL RIESGO Y PUESTO DE TRABAJO (IMAGEN, LABORATORIO Y OTROS)'),
        craftSpecificAndGeneralResults(record, subheader),
        craftSpacing(),
        header('DIAGNÓSTICO'),
        craftMedicalDiagnostic(record.diagnostics, subheader),
        craftSpacing(),
        header('APTITUD MÉDICA PARA EL TRABAJO'),
        craftMedicalFitnessForJob(record, subheader),
        craftSpacing(),
        header('RECOMENDACIONES Y/O TRATAMIENTO'),
        craftRecommendation(record),
        craftSpacing(),
    ];


const institutionLayout: CratftRecordItemFunc<PeriodicRecord & {
    clinicNumber: number;
    fileNumber: number;
}> = (record, subheader): any => [
    {
        width: '*',
        style: 'itemElement',
        table: {
            widths: ["*", "*", "*", "*", "*", "*"],
            body: [
                [
                    {
                        style: 'itemHeader',
                        text: 'INSTITUCIÓN DEL SISTEMA O NOMBRE DE LA EMPRESA',
                    },
                    {
                        style: 'itemHeader',
                        text: 'RUC',
                    },
                    {
                        style: 'itemHeader',
                        text: 'CIU',
                    },
                    {
                        style: 'itemHeader',
                        text: 'ESTABLECIMIENTO DE SALUD',
                    },
                    {
                        style: 'itemHeader',
                        text: 'NÚMERO DE HISTORIA CLÍNICA',
                    },
                    {
                        style: 'itemHeader',
                        text: 'NÚMERO DE ARCHIVO',
                    }
                ],
                [
                    record.companyName,
                    record.companyRUC,
                    record.companyCIU,
                    record.institutionHealthFacility,
                    record.clinicNumber.toString().padStart(12, '0'),
                    record.fileNumber.toString().padStart(12, '0'),
                ],
            ]
        },
        layout: {
            fillColor: subheader
        }
    },
    {
        width: '*',
        table: {
            widths: ["*", "*", "*", "*", "*", "*"],
            body: [
                [
                    {
                        border: [true, false, true, true],
                        style: 'itemHeader',
                        text: 'PRIMER APELLIDO ',
                    },
                    {
                        border: [true, false, true, true],
                        style: 'itemHeader',
                        text: 'SEGUNDO APELLIDO ',
                    },
                    {
                        border: [true, false, true, true],
                        style: 'itemHeader',
                        text: 'PRIMER NOMBRE',
                    },
                    {
                        border: [true, false, true, true],
                        style: 'itemHeader',
                        text: 'SEGUNDO NOMBRE',
                    },
                    {
                        border: [true, false, true, true],
                        style: 'itemHeader',
                        text: 'SEXO ',
                    },
                    {
                        border: [true, false, true, true],
                        text: 'PUESTO DE TRABAJO (CIUO)',
                        style: 'itemHeader',
                    },
                ],
                [
                    record.patientLastName,
                    record.patientSecondLastName,
                    record.patientFirstName,
                    record.patientMiddleName,
                    record.patientGender === 'male' ? 'Masculino' : 'Femenino',
                    record.jobPosition,
                ],
            ]
        },
        layout: {
            fillColor: subheader
        }
    },
];

const jobRiskLayout: CratftRecordItemFunc<PeriodicRecord> = (record, subheader) => [
    {
        style: 'itemElement',
        width: '*',
        table: {
            widths: ["*"],
            body: [[{
                style: 'itemHeader',
                border: [true, true, true, false],
                text: 'RIESGOS DEL PUESTO DE TRABAJO'
            }]]
        },
        layout: {
            fillColor: subheader
        }
    },
    {
        width: '*',
        table: {
            widths: ["auto", "*", "*"],
            body: [
                [
                    {
                        style: 'itemHeader',
                        text: 'No',
                    },
                    {
                        style: 'itemHeader',
                        text: 'PUESTO DE TRABAJO / ÁREA',
                    },
                    {
                        style: 'itemHeader',
                        text: 'ACTIVIDADES',
                    }
                ],
                ...record.jobRisks.map((e, i) => [
                    i.toString().padStart(2, '0'),
                    e.name,
                    e.activity,
                ]),
            ]
        },
        layout: {
            fillColor: subheader
        }
    },
    {
        width: '*',
        table: {
            widths: ["auto", "*", "*", "*", "*", "*", "*", "*", "*", "*", "*", "*", "*", "*", "*", "*", "*", "*", "*", "*", "*", "*", "*", "*", "*", "*", "*", "*", "*", "*", "*", "*", "*", "*", "*"],
            body: [
                [
                    {
                        border: [true, false, true, true],
                        style: 'itemHeader',
                        text: 'No',
                    },
                    {
                        border: [true, false, true, false],
                        style: 'itemHeader',
                        text: 'FÍSICO',
                        colSpan: 10
                    }, {}, {}, {}, {}, {}, {}, {}, {}, {},
                    {
                        border: [true, false, true, false],
                        style: 'itemHeader',
                        text: 'MECÁNICO',
                        colSpan: 15
                    }, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {},
                    {
                        border: [true, false, true, false],
                        style: 'itemHeader',
                        text: 'QUÍMICO',
                        colSpan: 9
                    }, {}, {}, {}, {}, {}, {}, {}, {},
                ],
                [
                    '',
                    verticalText('Temperaturas altas', { maxHeight: 150, maxWidth: 5, fontSize: 6 }),
                    verticalText('Temperaturas bajas', { maxHeight: 150, maxWidth: 5, fontSize: 6 }),
                    verticalText('Radiación Ionizante', { maxHeight: 150, maxWidth: 5, fontSize: 6 }),
                    verticalText('Radiación No Ionizante', { maxHeight: 150, maxWidth: 5, fontSize: 6 }),
                    verticalText('Ruido', { maxHeight: 150, maxWidth: 5, fontSize: 6 }),
                    verticalText('Vibración', { maxHeight: 150, maxWidth: 5, fontSize: 6 }),
                    verticalText('Iluminación', { maxHeight: 150, maxWidth: 5, fontSize: 6 }),
                    verticalText('Ventilación', { maxHeight: 150, maxWidth: 5, fontSize: 6 }),
                    verticalText('Fluido eléctrico', { maxHeight: 150, maxWidth: 5, fontSize: 6 }),
                    verticalText('Otros', { maxHeight: 150, maxWidth: 5, fontSize: 6 }),
                    verticalText('Atrapamiento entre máquinas', { maxHeight: 150, maxWidth: 5, fontSize: 6 }),
                    verticalText('Atrapamiento entre superficies', { maxHeight: 150, maxWidth: 5, fontSize: 6 }),
                    verticalText('Atrapamiento entre objetos', { maxHeight: 150, maxWidth: 5, fontSize: 6 }),
                    verticalText('Caída de objetos', { maxHeight: 150, maxWidth: 5, fontSize: 6 }),
                    verticalText('Caídas al mismo nivel', { maxHeight: 150, maxWidth: 5, fontSize: 6 }),
                    verticalText('Caídas a diferente nivel', { maxHeight: 150, maxWidth: 5, fontSize: 6 }),
                    verticalText('Contacto eléctrico', { maxHeight: 150, maxWidth: 5, fontSize: 6 }),
                    verticalText('Contacto con superficies de trabajos', { maxHeight: 150, maxWidth: 5, fontSize: 6 }),
                    verticalText('Proyección de partículas/fragmentos', { maxHeight: 150, maxWidth: 5, fontSize: 6 }),
                    verticalText('Proyección de fluidos', { maxHeight: 150, maxWidth: 5, fontSize: 6 }),
                    verticalText('Pinchazos', { maxHeight: 150, maxWidth: 5, fontSize: 6 }),
                    verticalText('Cortes', { maxHeight: 150, maxWidth: 5, fontSize: 6 }),
                    verticalText('Atropellamientos por vehículos', { maxHeight: 150, maxWidth: 5, fontSize: 6 }),
                    verticalText('Choques/Colisión vehicular', { maxHeight: 150, maxWidth: 5, fontSize: 6 }),
                    verticalText('Otros', { maxHeight: 150, maxWidth: 5, fontSize: 6 }),
                    verticalText('Sólidos', { maxHeight: 150, maxWidth: 5, fontSize: 6 }),
                    verticalText('Polvos', { maxHeight: 150, maxWidth: 5, fontSize: 6 }),
                    verticalText('Humos', { maxHeight: 150, maxWidth: 5, fontSize: 6 }),
                    verticalText('líquidos', { maxHeight: 150, maxWidth: 5, fontSize: 6 }),
                    verticalText('vapores', { maxHeight: 150, maxWidth: 5, fontSize: 6 }),
                    verticalText('Aerosoles', { maxHeight: 150, maxWidth: 5, fontSize: 6 }),
                    verticalText('Neblinas', { maxHeight: 150, maxWidth: 5, fontSize: 6 }),
                    verticalText('Gaseosos', { maxHeight: 150, maxWidth: 5, fontSize: 6 }),
                    verticalText('Otros', { maxHeight: 150, maxWidth: 5, fontSize: 6 }),
                ],
                ...record.jobRisks.map((e, i) => [
                    i.toString().padStart(2, '0'),
                    e.physicalRiskHighTemperature ? 'x' : '',
                    e.physicalRiskLowTemperature ? 'x' : '',
                    e.physicalRiskIonicRadiation ? 'x' : '',
                    e.physicalRiskNonIonicRadiation ? 'x' : '',
                    e.physicalRiskNoise ? 'x' : '',
                    e.physicalRiskVibration ? 'x' : '',
                    e.physicalRiskIllumination ? 'x' : '',
                    e.physicalRiskVentilation ? 'x' : '',
                    e.physicalRiskElectricFluid ? 'x' : '',
                    e.physicalRiskOther ? 'x' : '',
                    e.mechanicRiskEntrapmentBetweenMachines ? 'x' : '',
                    e.mechanicRiskTrappingBetweenSurfaces ? 'x' : '',
                    e.mechanicRiskEntrapmentBetweenObjects ? 'x' : '',
                    e.mechanicRiskObjectFalling ? 'x' : '',
                    e.mechanicRiskSameLevelFalling ? 'x' : '',
                    e.mechanicRiskDifferentLevelFalling ? 'x' : '',
                    e.mechanicRiskElectricContact ? 'x' : '',
                    e.mechanicRiskSurfacesContact ? 'x' : '',
                    e.mechanicRiskParticlesProjection ? 'x' : '',
                    e.mechanicRiskFluidProjection ? 'x' : '',
                    e.mechanicRiskJab ? 'x' : '',
                    e.mechanicRiskCut ? 'x' : '',
                    e.mechanicRiskHitByVehicles ? 'x' : '',
                    e.mechanicRiskVehicleCollision ? 'x' : '',
                    e.mechanicRiskOther ? 'x' : '',
                    e.chemicalRiskSolid ? 'x' : '',
                    e.chemicalRiskDust ? 'x' : '',
                    e.chemicalRiskSmoke ? 'x' : '',
                    e.chemicalRiskLiquid ? 'x' : '',
                    e.chemicalRiskSteam ? 'x' : '',
                    e.chemicalRiskAerosol ? 'x' : '',
                    e.chemicalRiskMist ? 'x' : '',
                    e.chemicalRiskGas ? 'x' : '',
                    e.chemicalRiskOther ? 'x' : '',
                ]),
                ...record.jobRisks.map((e, i) => [
                    i.toString().padStart(2, '0'),
                    {
                        text: e.physicalRiskOther ?? '',
                        colSpan: 10
                    }, {}, {}, {}, {}, {}, {}, {}, {}, {},
                    {
                        text: e.mechanicRiskOther ?? '',
                        colSpan: 15
                    }, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {},
                    {
                        text: e.chemicalRiskOther ?? '',
                        colSpan: 9
                    }, {}, {}, {}, {}, {}, {}, {}, {}
                ])
            ]
        },
        layout: {
            fillColor: (index) => subheader(index === 1 ? 0 : index)
        }
    },
    {
        width: '*',
        table: {
            widths: ["auto", "*", "*", "*", "*", "*", "*", "*", "*", "*", "*", "*", "*"],
            body: [
                [
                    {
                        border: [true, false, true, true],
                        style: 'itemHeader',
                        text: 'No',
                        rowSpan: 2
                    },
                    {
                        border: [true, false, true, true],
                        style: 'itemHeader',
                        text: 'BIOLÓGICO',
                        colSpan: 7
                    }, {}, {}, {}, {}, {}, {},
                    {
                        border: [true, false, true, true],
                        style: 'itemHeader',
                        text: 'ERGONÓMICO',
                        colSpan: 5
                    }, {}, {}, {}, {},
                ],
                [
                    '',
                    verticalText('Virus', { maxHeight: 175 }),
                    verticalText('Hongos', { maxHeight: 175 }),
                    verticalText('Bacterias', { maxHeight: 175 }),
                    verticalText('Parásitos', { maxHeight: 175 }),
                    verticalText('Exposición a vectores', { maxHeight: 175 }),
                    verticalText('Exposición a animales selváticos', { maxHeight: 175 }),
                    verticalText('Otros', { maxHeight: 175 }),
                    verticalText('Manejo manual de cargas', { maxHeight: 175 }),
                    verticalText('Movimiento repetitivos', { maxHeight: 175 }),
                    verticalText('Posturas forzadas', { maxHeight: 175 }),
                    verticalText('Trabajos con PVD', { maxHeight: 175 }),
                    verticalText('Otros', { maxHeight: 175 }),
                ],
                ...record.jobRisks.map((e, i) => [
                    i.toString().padStart(2, '0'),
                    e.biologicalRiskVirus ? 'x' : '',
                    e.biologicalRiskFungus ? 'x' : '',
                    e.biologicalRiskBacteria ? 'x' : '',
                    e.biologicalRiskParasites ? 'x' : '',
                    e.biologicalRiskExposureToVectors ? 'x' : '',
                    e.biologicalRiskExposureToWildlifeAnimals ? 'x' : '',
                    e.biologicalRiskOther ? 'x' : '',
                    e.ergonomicRiskManualHandlingLoads ? 'x' : '',
                    e.ergonomicRiskRepetitiveMoves ? 'x' : '',
                    e.ergonomicRiskForcedPostures ? 'x' : '',
                    e.ergonomicRiskWorkWithPvd ? 'x' : '',
                    e.ergonomicRiskOther ? 'x' : '',
                ]),
                ...record.jobRisks.map((e, i) => [
                    i.toString().padStart(2, '0'),
                    {
                        text: e.biologicalRiskOther ?? '',
                        colSpan: 7
                    }, {}, {}, {}, {}, {}, {},
                    {
                        text: e.ergonomicRiskOther ?? '',
                        colSpan: 5
                    }, {}, {}, {}, {},
                ])
            ]
        },
        layout: {
            fillColor: (index) => subheader(index === 1 ? 0 : index)
        }
    },
];

const jobRiskPreventionLayout: CratftRecordItemFunc<PeriodicRecord> = (record, subheader) => [
    {
        style: 'itemElement',
        width: '*',
        table: {
            widths: ["*"],
            body: [[{
                style: 'itemHeader',
                border: [true, true, true, false],
                text: 'RIESGOS DEL PUESTO DE TRABAJO CON MEDIDAS PREVENTIVAS'
            }]]
        },
        layout: {
            fillColor: subheader
        }
    },
    {
        width: '*',
        table: {
            widths: ["auto", "*", "*", "*"],
            body: [
                [
                    {
                        style: 'itemHeader',
                        text: 'No',
                    },
                    {
                        style: 'itemHeader',
                        text: 'PUESTO DE TRABAJO/ÁREA',
                    },
                    {
                        style: 'itemHeader',
                        text: 'ACTIVIDADES',
                    },
                    {
                        style: 'itemHeader',
                        text: 'MEDIDAS PREVENTIVAS'
                    }
                ],
                ...record.jobRiskWithPreventiveMeasure.map((e, i) => [
                    i.toString().padStart(2, '0'),
                    e.name,
                    e.activity,
                    e.preventiveMeasure
                ]),
            ]
        },
        layout: {
            fillColor: subheader
        }
    },
    {
        width: '*',
        table: {
            widths: ["auto", "*", "*", "*", "*", "*", "*", "*", "*", "*", "*", "*", "*", "*",],
            body: [
                [
                    {
                        border: [true, false, true, true],
                        style: 'itemHeader',
                        text: 'No',
                        rowSpan: 2
                    },
                    {
                        border: [true, false, true, true],
                        style: 'itemHeader',
                        text: 'PSICOSOCIAL',
                        colSpan: 13
                    }, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {},
                ],
                [
                    '',
                    verticalText('Monotonía del trabajo', { maxHeight: 175, }),
                    verticalText('Sobrecarga laboral', { maxHeight: 175, }),
                    verticalText('Minuciosidad de la tarea', { maxHeight: 175, }),
                    verticalText('Alta responsabilidad', { maxHeight: 175, }),
                    verticalText('Autonomía  en la toma de decisiones', { maxHeight: 175, }),
                    verticalText('Supervisión y estilos de dirección deficiente', { maxHeight: 175, }),
                    verticalText('Conflicto de rol', { maxHeight: 175, }),
                    verticalText('Falta de Claridad en las funciones', { maxHeight: 175, }),
                    verticalText('Incorrecta distribución del trabajo', { maxHeight: 175, }),
                    verticalText('Turnos rotativos', { maxHeight: 175, }),
                    verticalText('Relaciones interpersonales', { maxHeight: 175, }),
                    verticalText('inestabilidad laboral', { maxHeight: 175, }),
                    verticalText('Otros', { maxHeight: 175, }),
                ],
                ...record.jobRiskWithPreventiveMeasure.map((e, i) => [
                    i.toString().padStart(2, '0'),

                    e.psychosocialRiskMonotony ? 'x' : '',
                    e.psychosocialRiskWorkOverload ? 'x' : '',
                    e.psychosocialRiskThoroughnessOfTheTask ? 'x' : '',
                    e.psychosocialRiskHighResponsibility ? 'x' : '',
                    e.psychosocialRiskTakingResponsibilityAutonomy ? 'x' : '',
                    e.psychosocialRiskSupervision ? 'x' : '',
                    e.psychosocialRiskRoleConflict ? 'x' : '',
                    e.psychosocialRiskNonFunctionClarify ? 'x' : '',
                    e.psychosocialRiskBadWorkDistribution ? 'x' : '',
                    e.psychosocialRiskRotativeShift ? 'x' : '',
                    e.psychosocialRiskIntrapersonalRelations ? 'x' : '',
                    e.psychosocialRiskJobInstability ? 'x' : '',
                    e.psychosocialRiskOther ? 'x' : '',
                ]),
                ...record.jobRiskWithPreventiveMeasure.map((e, i) => [
                    i.toString().padStart(2, '0'),
                    {
                        text: e.psychosocialRiskOther ?? '',
                        colSpan: 13
                    }, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {},
                ])
            ]
        },
        layout: {
            fillColor: (index) => subheader(index === 1 ? 0 : index)
        }
    },
]; */