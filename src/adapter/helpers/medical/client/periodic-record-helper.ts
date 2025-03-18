import { craftCurrentDisease, craftFamilyHistory, craftJobAccident, craftMedicalAndSurgicalHistory, craftMedicalConsultation, craftMedicalDiagnostic, craftMedicalFitnessForJob, craftOccupationalDisease, craftPhysicalRegionalExam, craftRecommendation, CraftRecordFunc, craftReviewOfOrgansAndSystem, craftSpacing, craftSpecificAndGeneralResults, craftToxicHabits, craftVitalSignsAndAnthropometry, CratftRecordItemFunc, verticalText } from "./generic-record-helper";
import { PeriodicRecord } from "@omega/medical/application/type/periodic-record";

export const createPeriodicRecord: CraftRecordFunc<PeriodicRecord> = (record: PeriodicRecord, header, subheader) => [
    header('DATOS DEL ESTABLECIMIENTO - EMPRESA Y USUARIO'),
    institutionLayout(record, subheader),
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


const institutionLayout: CratftRecordItemFunc<PeriodicRecord> = (record, subheader): any => [
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
                    '',
                    '',
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


export const craftMedicalIncident: CratftRecordItemFunc<PeriodicRecord> = (record, subheader): object[] => [
    {
        width: '*',
        style: 'itemElement',
        table: {
            widths: ["*"],
            body: [
                [
                    {
                        border: [true, true, true, false],
                        style: 'itemHeader',
                        text: 'INCIDENTES',
                    },
                ]
            ]
        },
        layout: {
            fillColor: subheader
        }
    },
    {
        width: '*',
        table: {
            widths: ["*"],
            body: [
                [
                    {
                        border: [true, true, true, false],
                        style: 'descriptionItem',
                        text: 'Descripción',
                    }
                ],
                [
                    {
                        border: [true, false, true, true],
                        text: record.incidentDescription,
                    }
                ],
            ]
        }
    }];

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
];