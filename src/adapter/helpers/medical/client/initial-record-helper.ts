import { InitialRecord } from "@omega/medical/application/type/initial-record";
import { craftCurrentDisease, craftExtraActivity, craftFamilyHistory, craftJobAccident, craftLifeStyle, craftMedicalAndSurgicalHistory, craftMedicalConsultation, craftMedicalDiagnostic, craftMedicalFitnessForJob, craftOccupationalDisease, craftPhysicalRegionalExam, craftRecommendation, CraftRecordFunc, craftReviewOfOrgansAndSystem, craftSpacing, craftSpecificAndGeneralResults, craftToxicHabits, craftVitalSignsAndAnthropometry, CratftRecordItemFunc, verticalText } from "./generic-record-helper";
import { formatDate } from "date-fns";

export const createInitialRecord: CraftRecordFunc<InitialRecord> = (record: InitialRecord, header, subheader) => [
    header('DATOS DEL ESTABLECIMIENTO - EMPRESA Y USUARIO'),
    institutionLayout(record, subheader),
    craftSpacing(),
    header('MOTIVO DE CONSULTA'),
    craftMedicalConsultation(record),
    craftSpacing(),
    header('ANTECEDENTES PERSONALES'),
    craftMedicalAndSurgicalHistory(record, subheader),
    gynecologicalHistoryLayout(record, subheader),
    maleReproducitveHistoryLayout(record, subheader),
    craftToxicHabits([
        { ...record.toxicHabitTobacco, name: 'Tabaco' },
        { ...record.toxicHabitTobacco, name: 'Alcohol' },
        { ...record.toxicHabitTobacco, name: 'other' },
    ].filter(e => !!e), subheader),
    craftLifeStyle(record, subheader),
    craftSpacing(),
    header('ANTECEDENTES DE TRABAJO'),
    jobHistoryLayout(record, subheader),
    craftJobAccident(record, subheader),
    craftOccupationalDisease(record, subheader),
    craftSpacing(),
    header('ANTECEDENTES FAMILIARES (DETALLAR EL PARENTESCO)'),
    craftFamilyHistory(record, subheader),
    craftSpacing(),
    header('FACTORES DE RIESGOS DEL PUESTO DE TRABAJO ACTUAL'),
    jobRiskLayout(record, subheader),
    jobRiskPreventionLayout(record, subheader),
    craftSpacing(),
    header('ACTIVIDADES EXTRA LABORALES'),
    craftExtraActivity(record),
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


const institutionLayout: CratftRecordItemFunc<InitialRecord> = (record, subheader): any => [
    {
        width: '*',
        style: 'itemElement',
        table: {
            widths: ["auto", "auto", "auto", "auto", "auto", "auto"],
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
            widths: ["auto", "auto", "auto", "auto", "auto", "auto", "auto", "auto", "auto"],
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
                        style: 'itemHeader',
                        text: 'EDAD (AÑOS)',
                    },
                    {
                        border: [true, false, true, true],
                        style: 'itemHeader',
                        text: 'RELIGIÓN',
                    },
                    {
                        border: [true, false, true, true],
                        style: 'itemHeader',
                        text: 'GRUPO SANGUÍNEO',
                    },
                    {
                        border: [true, false, true, true],
                        style: 'itemHeader',
                        text: 'LATERALIDA',
                    }
                ],
                [
                    record.patientLastName,
                    record.patientSecondLastName,
                    record.patientFirstName,
                    record.patientMiddleName,
                    record.patientGender === 'male' ? 'Masculino' : 'Femenino',
                    record.patientAge,
                    record.patientReligion === 'catholic'
                        ? 'Catolica'
                        : (record.patientReligion === 'evangelical'
                            ? 'Evangelica'
                            : (record.patientReligion === 'mormon'
                                ? 'Mormona'
                                : (record.patientReligion === 'jehovah\'s witnesses'
                                    ? 'Testigos de Jehova'
                                    : record.patientOtherReligion ?? ''
                                )
                            )
                        ),
                    record.patientBloodType,
                    record.patientLaterality
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
            widths: ["auto", "auto", "auto", "auto", "auto", "auto", "auto"],
            body: [
                [
                    {
                        border: [true, false, true, true],
                        text: 'ORIENTACIÓN SEXUAL',
                        style: 'itemHeader',
                    },
                    {
                        border: [true, false, true, true],
                        text: 'IDENTIDAD DE GÉNERO',
                        style: 'itemHeader',
                    },
                    {
                        border: [true, false, true, true],
                        text: ' DISCAPACIDAD',
                        style: 'itemHeader',
                    },
                    {
                        border: [true, false, true, true],
                        text: 'FECHA DE INGRESO AL TRABAJO',
                        style: 'itemHeader',
                    },
                    {
                        border: [true, false, true, true],
                        text: 'PUESTO DE TRABAJO (CIUO)',
                        style: 'itemHeader',
                    },
                    {
                        border: [true, false, true, true],
                        text: 'ÁREA DE TRABAJO',
                        style: 'itemHeader',
                    },
                    {
                        border: [true, false, true, true],
                        text: 'ACTIVIDADES RELEVANTES AL PUESTO DE TRABAJO A OCUPAR',
                        style: 'itemHeader',
                    },
                ],
                [
                    record.patientSexualOrientation === 'lesbian'
                        ? 'Lesbiana'
                        : (record.patientSexualOrientation === 'bisexual'
                            ? 'Bisexual'
                            : (record.patientSexualOrientation === 'gay'
                                ? 'Gay'
                                : (record.patientSexualOrientation === 'heterosexual'
                                    ? 'Heterosexual'
                                    : 'No aplica'
                                )
                            )
                        ),
                    record.patientGenderIdentity === 'male'
                        ? 'Masculino'
                        : (record.patientGenderIdentity === 'female'
                            ? 'Femenino'
                            : (record.patientGenderIdentity === 'trans-male'
                                ? 'Trans-masculino'
                                : (record.patientGenderIdentity === 'trans-female'
                                    ? 'Trans-femenino'
                                    : 'No aplica'
                                )
                            )
                        ),
                    !!record.patientDisabilityType ? `${record.patientDisabilityType} ${record.patientDisabilityPercent}%` : 'No aplica',
                    formatDate(record.jobStartDate, 'yyyy/MM/dd'),
                    record.jobPosition,
                    record.jobArea,
                    record.jobActivity
                ],
            ]
        },
        layout: {
            fillColor: subheader
        }
    }
];

const gynecologicalHistoryLayout: CratftRecordItemFunc<InitialRecord> = (record, subheader) => [
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
                        text: 'ANTECEDENTES GINECO OBSTÉTRICOS',
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
            widths: ["auto", "auto", "auto", "auto", "auto", "auto", "auto", "auto", "auto", "auto", "auto"],
            body: [
                [
                    {
                        style: 'itemHeader',
                        text: 'MENARQUÍA',
                    },
                    {
                        style: 'itemHeader',
                        text: 'CICLOS',
                    },
                    {
                        style: 'itemHeader',
                        text: 'FECHA DE ULTIMA MENSTRUACIÓN',
                    },
                    {
                        style: 'itemHeader',
                        stack: [
                            { text: 'G' },
                            { text: 'E' },
                            { text: 'S' },
                            { text: 'T' },
                            { text: 'A' },
                            { text: 'S' },
                        ],
                        alignment: 'center',
                    },
                    {
                        style: 'itemHeader',
                        stack: [
                            { text: 'P' },
                            { text: 'A' },
                            { text: 'R' },
                            { text: 'T' },
                            { text: 'O' },
                            { text: 'S' },
                        ],
                        alignment: 'center',
                    },
                    {
                        style: 'itemHeader',
                        stack: [
                            { text: 'C' },
                            { text: 'E' },
                            { text: 'S' },
                            { text: 'A' },
                            { text: 'R' },
                            { text: 'E' },
                            { text: 'Á' },
                            { text: 'S' },
                        ],
                        alignment: 'center',
                    },
                    {
                        style: 'itemHeader',
                        stack: [
                            { text: 'A' },
                            { text: 'B' },
                            { text: 'O' },
                            { text: 'R' },
                            { text: 'T' },
                            { text: 'O' },
                            { text: 'S' },
                        ],
                        alignment: 'center',
                    },
                    {
                        style: 'itemHeader',
                        text: 'HIJOS VIVOS',
                    },
                    {
                        style: 'itemHeader',
                        text: 'HIJOS MUERTOS',
                    },
                    {
                        style: 'itemHeader',
                        text: 'VIDA SEXUAL ACTIVA',
                    },
                    {
                        style: 'itemHeader',
                        text: 'MÉTODO DE PLANIFICACIÓN FAMILIAR',
                    },
                ],
                [
                    record.gynecologicalMenarche,
                    record.gynecologicalCycle,
                    formatDate(record.gynecologicalLastMenstruationDate, 'yyyy/MM/dd'),
                    record.gynecologicalDeeds,
                    record.gynecologicalBirths,
                    record.gynecologicalCesarean,
                    record.gynecologicalAbortions,
                    record.gynecologicalLivingChildren,
                    record.gynecologicalDeadChildren,
                    record.gynecologicalSexualLife ? 'Si' : 'No',
                    record.gynecologicalFamilyPlanningType ? record.gynecologicalFamilyPlanningType : 'No',
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
            widths: ["auto", "auto", "auto", "auto", "*"],
            body: [
                [
                    {
                        border: [true, false, true, false],
                        style: 'itemHeader',
                        text: 'EXÁMENES REALIZADOS',
                    },
                    {
                        border: [true, false, true, false],
                        style: 'itemHeader',
                        text: 'SI ',
                    },
                    {
                        border: [true, false, true, false],
                        style: 'itemHeader',
                        text: 'NO',
                    },
                    {
                        border: [true, false, true, false],
                        style: 'itemHeader',
                        text: 'TIEMPO (años)',
                    },
                    {
                        border: [true, false, true, false],
                        style: 'itemHeader',
                        text: 'RESULTADO',
                    },
                ],
                [
                    'PAPANICOLAOU',
                    record.gynecologicalExamPapanicolau.done ? 'x' : '',
                    !record.gynecologicalExamPapanicolau.done ? 'x' : '',
                    record.gynecologicalExamPapanicolau.time ?? '',
                    record.gynecologicalExamPapanicolau.result ?? '',
                ],
                [
                    'COLPOSCOPIA',
                    record.gynecologicalExamColposcopy.done ? 'x' : '',
                    !record.gynecologicalExamColposcopy.done ? 'x' : '',
                    record.gynecologicalExamColposcopy.time ?? '',
                    record.gynecologicalExamColposcopy.result ?? '',
                ],
                [
                    'ECO MAMARIO',
                    record.gynecologicalExamBreastEcho.done ? 'x' : '',
                    !record.gynecologicalExamBreastEcho.done ? 'x' : '',
                    record.gynecologicalExamBreastEcho.time ?? '',
                    record.gynecologicalExamBreastEcho.result ?? '',
                ],
                [
                    'MAMOGRAFÍA',
                    record.gynecologicalExamMammography.done ? 'x' : '',
                    !record.gynecologicalExamMammography.done ? 'x' : '',
                    record.gynecologicalExamMammography.time ?? '',
                    record.gynecologicalExamMammography.result ?? '',
                ],
            ]
        },
        layout: {
            fillColor: subheader
        }
    },
];

const maleReproducitveHistoryLayout: CratftRecordItemFunc<InitialRecord> = (record, subheader) => [
    {
        style: 'itemElement',
        width: '*',
        table: {
            widths: ["*"],
            body: [
                [
                    {
                        border: [true, true, true, false],
                        style: 'itemHeader',
                        text: 'ANTECEDENTES REPRODUCTIVOS MASCULINOS',
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
            widths: ["auto", "auto", "auto", "auto", "*"],
            body: [
                [
                    {
                        border: [true, true, true, false],
                        style: 'itemHeader',
                        text: 'EXÁMENES REALIZADOS',
                    },
                    {
                        border: [true, true, true, false],
                        style: 'itemHeader',
                        text: 'SI ',
                    },
                    {
                        border: [true, true, true, false],
                        style: 'itemHeader',
                        text: 'NO',
                    },
                    {
                        border: [true, true, true, false],
                        style: 'itemHeader',
                        text: 'TIEMPO (años)',
                    },
                    {
                        border: [true, true, true, false],
                        style: 'itemHeader',
                        text: 'RESULTADO',
                    },
                ],
                [
                    'ANTÍGENO PROSTÁTICO',
                    record.maleReproductiveExamProstateAntigen.done ? 'x' : '',
                    !record.maleReproductiveExamProstateAntigen.done ? 'x' : '',
                    record.maleReproductiveExamProstateAntigen.time ?? '',
                    record.maleReproductiveExamProstateAntigen.result ?? '',
                ],
                [
                    'ECO PROSTÁTICO',
                    record.maleReproductiveExamProstateEcho.done ? 'x' : '',
                    !record.maleReproductiveExamProstateEcho.done ? 'x' : '',
                    record.maleReproductiveExamProstateEcho.time ?? '',
                    record.maleReproductiveExamProstateEcho.result ?? '',
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
            widths: ["auto", "auto", "*"],
            body: [
                [
                    {
                        border: [true, false, true],
                        style: 'itemHeader',
                        text: 'HIJOS VIVOS',
                    },
                    {
                        border: [true, false, true],
                        style: 'itemHeader',
                        text: 'HIJOS MUERTOS',
                    },
                    {
                        border: [true, false, true],
                        style: 'itemHeader',
                        text: 'MÉTODO DE PLANIFICACIÓN FAMILIAR',
                    },
                ],
                [
                    record.maleReproductiveLivingChildren,
                    record.maleReproductiveDeadChildren,
                    record.maleReproductiveFamilyPlanningType,
                ],
            ]
        },
        layout: {
            fillColor: subheader
        }
    },
];

const jobHistoryLayout: CratftRecordItemFunc<InitialRecord> = (record, subheader) => [
    {
        style: 'itemElement',
        width: '*',
        table: {
            widths: ["*"],
            body: [
                [
                    {
                        border: [true, true, true, false],
                        style: 'itemHeader',
                        text: 'ANTECEDENTES DE EMPLEOS ANTERIORES',
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
            widths: ["*", "*", "*", "*", "auto", "auto", "auto", "auto", "auto", "auto", '*'],
            body: [
                [
                    {
                        border: [true, true, true, false],
                        style: 'itemHeader',
                        text: 'EMPRESA',
                        rowSpan: 2
                    },
                    {
                        border: [true, true, true, false],
                        style: 'itemHeader',
                        text: 'PUESTO DE TRABAJO',
                        rowSpan: 2
                    },
                    {
                        border: [true, true, true, false],
                        style: 'itemHeader',
                        text: 'ACTIVIDADES QUE DESEMPEÑABA',
                        rowSpan: 2
                    },
                    {
                        border: [true, true, true, false],
                        style: 'itemHeader',
                        text: 'TIEMPO DE TRABAJO',
                        rowSpan: 2
                    },
                    {
                        border: [true, true, true, false],
                        style: 'itemHeader',
                        text: 'RIESGO',
                        colSpan: 6
                    },
                    {}, {}, {}, {}, {},
                    {
                        border: [true, true, true, false],
                        style: 'itemHeader',
                        text: 'OBSERVACIONES',
                        rowSpan: 2
                    }
                ],
                [
                    '', '', '', '',
                    {
                        style: 'itemHeader',
                        stack: [{ text: 'F' }, { text: 'I' }, { text: 'S' }, { text: 'I' }, { text: 'C' }, { text: 'O' },],
                        alignment: 'center',
                        fontSize: 8
                    },
                    {
                        style: 'itemHeader',
                        stack: [{ text: 'M' }, { text: 'E' }, { text: 'C' }, { text: 'Á' }, { text: 'N' }, { text: 'I' }, { text: 'C' }, { text: 'O' },],
                        alignment: 'center',
                        fontSize: 8
                    },
                    {
                        style: 'itemHeader',
                        stack: [{ text: 'Q' }, { text: 'U' }, { text: 'Í' }, { text: 'M' }, { text: 'I' }, { text: 'C' }, { text: 'O' },],
                        alignment: 'center',
                        fontSize: 8
                    },
                    {
                        style: 'itemHeader',
                        stack: [{ text: 'B' }, { text: 'I' }, { text: 'O' }, { text: 'L' }, { text: 'Ó' }, { text: 'G' }, { text: 'I' }, { text: 'C' }, { text: 'O' },],
                        alignment: 'center',
                        fontSize: 8
                    },
                    {
                        style: 'itemHeader',
                        stack: [{ text: 'E' }, { text: 'R' }, { text: 'G' }, { text: 'O' }, { text: 'N' }, { text: 'Ó' }, { text: 'M' }, { text: 'I' }, { text: 'C' }, { text: 'O' },],
                        alignment: 'center',
                        fontSize: 8
                    },
                    {
                        style: 'itemHeader',
                        stack: [{ text: 'P' }, { text: 'S' }, { text: 'I' }, { text: 'C' }, { text: 'O' }, { text: 'S' }, { text: 'O' }, { text: 'C' }, { text: 'I' }, { text: 'A' }, { text: 'L' },],
                        alignment: 'center',
                        fontSize: 8
                    },
                    ''
                ],
                ...record.jobHistory.map(e => [
                    e.lastJobCompany,
                    e.lastJobPosition,
                    e.lastJobActivity,
                    e.lastJobTime,
                    e.lastJobRiskPhysical ? 'x' : '',
                    e.lastJobRiskMechanical ? 'x' : '',
                    e.lastJobRiskChemical ? 'x' : '',
                    e.lastJobRiskBiological ? 'x' : '',
                    e.lastJobRiskErgonomic ? 'x' : '',
                    e.lastJobRiskPhysical ? 'x' : '',
                    e.lastJobObservation
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
            widths: ["auto", "auto", "*"],
            body: [
                [
                    {
                        border: [true, false, true],
                        style: 'itemHeader',
                        text: 'HIJOS VIVOS',
                    },
                    {
                        border: [true, false, true],
                        style: 'itemHeader',
                        text: 'HIJOS MUERTOS',
                    },
                    {
                        border: [true, false, true],
                        style: 'itemHeader',
                        text: 'MÉTODO DE PLANIFICACIÓN FAMILIAR',
                    },
                ],
                [
                    record.maleReproductiveLivingChildren,
                    record.maleReproductiveDeadChildren,
                    record.maleReproductiveFamilyPlanningType,
                ],
            ]
        },
        layout: {
            fillColor: subheader
        }
    },
];

const jobRiskLayout: CratftRecordItemFunc<InitialRecord> = (record, subheader) => [
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
                        rowSpan: 2
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
                    }, {}, {}, {}, {}, {}, {}, {}, {}
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
];

const jobRiskPreventionLayout: CratftRecordItemFunc<InitialRecord> = (record, subheader) => [

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
            widths: ["auto", "*", "*", "*", "*", "*", "*", "*", "*", "*", "*", "*", "*", "*", "*", "*", "*", "*", "*", "*", "*", "*", "*", "*", "*", "*"],
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
                    {
                        border: [true, false, true, true],
                        style: 'itemHeader',
                        text: 'PSICOSOCIAL',
                        colSpan: 13
                    }, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {},
                ],
                [
                    '',
                    verticalText('Virus', { maxHeight: 175, }),
                    verticalText('Hongos', { maxHeight: 175, }),
                    verticalText('Bacterias', { maxHeight: 175, }),
                    verticalText('Parásitos', { maxHeight: 175, }),
                    verticalText('Exposición a vectores', { maxHeight: 175, }),
                    verticalText('Exposición a animales selváticos', { maxHeight: 175, }),
                    verticalText('Otros', { maxHeight: 175, }),
                    verticalText('Manejo manual de cargas', { maxHeight: 175, }),
                    verticalText('Movimiento repetitivos', { maxHeight: 175, }),
                    verticalText('Posturas forzadas', { maxHeight: 175, }),
                    verticalText('Trabajos con PVD', { maxHeight: 175, }),
                    verticalText('Otros', { maxHeight: 175, }),
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
                        text: e.biologicalRiskOther ?? '',
                        colSpan: 7
                    }, {}, {}, {}, {}, {}, {},
                    {
                        text: e.ergonomicRiskOther ?? '',
                        colSpan: 5
                    }, {}, {}, {}, {},
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