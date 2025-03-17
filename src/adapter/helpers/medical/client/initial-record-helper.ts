import { InitialRecord } from "@omega/medical/application/type/initial-record";
import { craftJobAccident, craftLifeStyle, craftMedicalAndSurgicalHistory, craftMedicalConsultation, craftOccupationalDisease, craftPhysicalRegionalExam, CraftRecordFunc, craftSpacing, craftToxicHabits, CratftRecordItemFunc } from "./generic-record-helper";
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
    header('EXAMEN FÍSICO REGIONAL'),
    craftPhysicalRegionalExam(record, subheader),
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
                        stack: [
                            { text: 'F' },
                            { text: 'I' },
                            { text: 'S' },
                            { text: 'I' },
                            { text: 'C' },
                            { text: 'O' },
                        ],
                        alignment: 'center',
                        fontSize: 8
                    },
                    {
                        style: 'itemHeader',
                        stack: [
                            { text: 'M' },
                            { text: 'E' },
                            { text: 'C' },
                            { text: 'Á' },
                            { text: 'N' },
                            { text: 'I' },
                            { text: 'C' },
                            { text: 'O' },
                        ],
                        alignment: 'center',
                        fontSize: 8
                    },
                    {
                        style: 'itemHeader',
                        stack: [
                            { text: 'Q' },
                            { text: 'U' },
                            { text: 'Í' },
                            { text: 'M' },
                            { text: 'I' },
                            { text: 'C' },
                            { text: 'O' },
                        ],
                        alignment: 'center',
                        fontSize: 8
                    },
                    {
                        style: 'itemHeader',
                        stack: [
                            { text: 'B' },
                            { text: 'I' },
                            { text: 'O' },
                            { text: 'L' },
                            { text: 'Ó' },
                            { text: 'G' },
                            { text: 'I' },
                            { text: 'C' },
                            { text: 'O' },
                        ],
                        alignment: 'center',
                        fontSize: 8
                    },
                    {
                        style: 'itemHeader',
                        stack: [
                            { text: 'E' },
                            { text: 'R' },
                            { text: 'G' },
                            { text: 'O' },
                            { text: 'N' },
                            { text: 'Ó' },
                            { text: 'M' },
                            { text: 'I' },
                            { text: 'C' },
                            { text: 'O' },
                        ],
                        alignment: 'center',
                        fontSize: 8
                    },
                    {
                        style: 'itemHeader',
                        stack: [
                            { text: 'P' },
                            { text: 'S' },
                            { text: 'I' },
                            { text: 'C' },
                            { text: 'O' },
                            { text: 'S' },
                            { text: 'O' },
                            { text: 'C' },
                            { text: 'I' },
                            { text: 'A' },
                            { text: 'L' },
                        ],
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