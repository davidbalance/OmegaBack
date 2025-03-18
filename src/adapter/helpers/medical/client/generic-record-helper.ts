import { GenericRecord } from "@omega/medical/application/commands/client/client-add-record.command"
import { CertificateRecord } from "@omega/medical/application/type/certificate-record"
import { InitialRecord } from "@omega/medical/application/type/initial-record"
import { PeriodicRecord } from "@omega/medical/application/type/periodic-record"
import { ReintegrateRecord } from "@omega/medical/application/type/reintegrate-record"
import { RetirementRecord } from "@omega/medical/application/type/retirement-record"
import { createInitialRecord } from "./initial-record-helper"
import { CurrentDisease, ExtraActivity, FamilyHistory, GeneralExamResultAndSpecific, JobAccident, LifeStyle, MedicalAndSurgicalHistory, MedicalConsultation, MedicalDiagnostic, MedicalFitnessForJob, OccupationalDisease, PhysicalRegionalExam, RecordRecommendation, ReviewOfOrgansAndSystem, ToxicDetail, VitalSignsAndAnthropometry } from "@omega/medical/application/type/record.type"
import { formatDate } from "date-fns"
import { createPeriodicRecord } from "./periodic-record-helper"
import { createRetirementRecord } from "./retirement-record-helper"
import { createReintegrationRecord } from "./reintegration-record-helper"

const isInitialRecord = (record: GenericRecord): record is InitialRecord => record.type === 'inicial';
const isPeriodicRecord = (record: GenericRecord): record is PeriodicRecord => record.type === 'periodico';
const isReintegrateRecord = (record: GenericRecord): record is ReintegrateRecord => record.type === 'reintegrar';
const isRetirementRecord = (record: GenericRecord): record is RetirementRecord => record.type === 'retiro';
const isCertificateRecord = (record: GenericRecord): record is CertificateRecord => record.type === 'certificado';

export type HeaderLayoutFunc = (rowIndex: number) => string | null;
export type SubheaderLayoutFunc = (rowIndex: number) => string | null;

type CreateHeaderFunc = (text: string) => object;
export type CraftRecordFunc<T extends GenericRecord> = (record: T, headerLayout: CreateHeaderFunc, subheader: SubheaderLayoutFunc) => object[];
export type CratftRecordItemFunc<T extends GenericRecord> = (record: T, subheader: SubheaderLayoutFunc) => object | object[];

export const createRecordLayout = (record: GenericRecord, headerLayout: HeaderLayoutFunc, subheaderLayout: SubheaderLayoutFunc): object[] => {
    if (isInitialRecord(record)) {
        return createInitialRecord(record, createHeader(headerLayout), subheaderLayout);
    }
    if (isPeriodicRecord(record)) {
        return createPeriodicRecord(record, createHeader(headerLayout), subheaderLayout);
    }
    if (isReintegrateRecord(record)) {
        return createReintegrationRecord(record, createHeader(headerLayout), subheaderLayout);
    }
    if (isRetirementRecord(record)) {
        return createRetirementRecord(record, createHeader(headerLayout), subheaderLayout);
    }
    if (isCertificateRecord(record)) { }

    return [];
}

export const craftSpacing = () => ({
    text: '',
    marginTop: 10
})

type VerticalTextOptions = Partial<{
    maxHeight: number;
    maxWidth: number;
    fontSize: number;
}>
const defaultOptions: Required<VerticalTextOptions> = {
    maxHeight: 100,
    maxWidth: 10,
    fontSize: 8,
}
export const verticalText = (text: string, options: VerticalTextOptions = defaultOptions): object => {
    const currentOptions: Required<VerticalTextOptions> = { ...defaultOptions, ...options };
    const { fontSize, maxHeight, maxWidth } = currentOptions;
    const xPos = 6;
    const yPos = maxHeight - 5;

    return {
        svg: `<svg width="${maxWidth}" height="${maxHeight}">
              <text x="${xPos}" y="${yPos}" transform="rotate(-90, ${xPos}, ${yPos})" font-size="${fontSize}">
                ${text}
              </text>
            </svg>`,
    };
}

export const craftMedicalConsultation = (value: MedicalConsultation): object => ({
    width: '*',
    style: 'itemElement',
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
                    text: value.medicalConsultationDescription,
                }
            ],
        ]
    }
});

export const craftMedicalAndSurgicalHistory = (value: MedicalAndSurgicalHistory, subheader: SubheaderLayoutFunc): object => ({
    width: '*',
    style: 'itemElement',
    table: {
        widths: ["*"],
        body: [
            [
                {
                    style: 'itemHeader',
                    text: 'ANTECEDENTES CLÍNICOS Y QUIRÚRGICOS',
                },
            ],
            [
                {
                    border: [true, false, true, false],
                    style: 'descriptionItem',
                    text: 'Descripción',
                }
            ],
            [
                {
                    border: [true, false, true, true],
                    text: value.medicalAndSurgicalHistory,
                }
            ],
        ],

    },
    layout: {
        fillColor: subheader
    }
});

export const craftToxicHabits = (values: (Partial<ToxicDetail> & { name: string | 'other' })[], subheader: SubheaderLayoutFunc): object[] => [
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
                        text: 'HÁBITOS TÓXICOS',
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
            widths: ["*", "auto", "auto", "*", "*", "*", "*"],
            body: [
                [
                    {
                        style: 'itemHeader',
                        text: 'CONSUMOS NOCIVOS',
                    },
                    {
                        style: 'itemHeader',
                        text: 'SI',
                    },
                    {
                        style: 'itemHeader',
                        text: 'NO',
                    },
                    {
                        style: 'itemHeader',
                        text: 'TIEMPO DE CONSUMO',
                    },
                    {
                        style: 'itemHeader',
                        text: 'CANTIDAD',
                    },
                    {
                        style: 'itemHeader',
                        text: 'EX CONSUMIDOR',
                    },
                    {
                        style: 'itemHeader',
                        text: 'TIEMPO DE ABSTINENCIA',
                    },
                ],
                ...values.map(e => [
                    e.name,
                    e.consumed ? 'x' : '',
                    !e.consumed ? '' : 'x',
                    e.consumptionTime ?? '',
                    e.quantity ?? '',
                    e.consumer ? 'Si' : 'No',
                    e.timeOfAbstinence ?? ''
                ])
            ]
        },
        layout: {
            fillColor: subheader
        }
    }];

export const craftLifeStyle = (value: LifeStyle, subheader: SubheaderLayoutFunc): object[] => [
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
                        text: 'ESTILO DE VIDA',
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
            widths: ["*", "auto", "auto", "*", "*"],
            body: [
                [
                    {
                        style: 'itemHeader',
                        text: 'ESTILO',
                    },
                    {
                        style: 'itemHeader',
                        text: 'SI',
                    },
                    {
                        style: 'itemHeader',
                        text: 'NO',
                    },
                    {
                        style: 'itemHeader',
                        text: ' ¿CUÁL?',
                    },
                    {
                        style: 'itemHeader',
                        text: ' TIEMPO / CANTIDAD',
                    }
                ],
                [
                    'ACTIVIDAD FÍSICA',
                    value.lifestylePhysicalActivityActive ? 'x' : '',
                    !value.lifestylePhysicalActivityActive ? '' : 'x',
                    value.lifestylePhysicalActivityType ?? '',
                    value.lifestylePhysicalActivityDuration ?? ''
                ],
                [
                    'MEDICACIÓN HABITUAL',
                    value.lifestyleMedicationTaking ? 'x' : '',
                    !value.lifestyleMedicationTaking ? '' : 'x',
                    value.lifestyleMedicationName ?? '',
                    value.lifestyleMedicationQuantity ?? ''
                ]
            ]
        },
        layout: {
            fillColor: subheader
        }
    }];

export const craftJobAccident = (value: JobAccident, subheader: SubheaderLayoutFunc): object[] => [
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
                        text: 'ACCIDENTES DE TRABAJO (DESCRIPCIÓN)',
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
            widths: ["*", "*"],
            body: [
                [
                    {
                        border: [true, true, false, true],
                        text: 'FUE CALIFICADO POR EL INSTITUTO DE SEGURIDAD SOCIAL CORRESPONDIENTE:',
                    },
                    {
                        border: [false, true, true, true],
                        text: value.jobAccidentHappened ? 'Si' : 'No',
                    }
                ],
                [
                    {
                        text: `ESPECIFICAR: - ${value.jobAccidentDescription ?? ''}`,
                    },
                    {
                        text: !!value.jobAccidentDate ? formatDate(value.jobAccidentDate, 'yyyy/MM/dd') : '',
                    }
                ],
                [
                    {
                        border: [true, true, true, false],
                        style: 'descriptionItem',
                        text: 'Observaciones:',
                        colSpan: 2,
                    }, {}
                ],
                [
                    {
                        border: [true, false, true, true],
                        text: value.jobAccidentObservation ?? '',
                        colSpan: 2,
                    }, {}
                ],
            ]
        }
    }];

export const craftOccupationalDisease = (value: OccupationalDisease, subheader: SubheaderLayoutFunc): object[] => [
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
                        text: 'ENFERMEDADES PROFESIONALES',
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
            widths: ["*", "*"],
            body: [
                [
                    {
                        border: [true, true, false, true],
                        text: 'FUE CALIFICADO POR EL INSTITUTO DE SEGURIDAD SOCIAL CORRESPONDIENTE:',
                    },
                    {
                        border: [false, true, true, true],
                        text: value.occupationalDiseaseHappened ? 'Si' : 'No',
                    }
                ],
                [
                    {
                        text: `ESPECIFICAR: - ${value.occupationalDiseaseDescription ?? ''}`,
                    },
                    {
                        text: !!value.occupationalDiseaseDate ? formatDate(value.occupationalDiseaseDate, 'yyyy/MM/dd') : '',
                    }
                ],
                [
                    {
                        border: [true, true, true, false],
                        style: 'descriptionItem',
                        text: 'Observaciones:',
                        colSpan: 2,
                    }, {}
                ],
                [
                    {
                        border: [true, false, true, true],
                        text: value.occupationalDiseaseObservation ?? '',
                        colSpan: 2,
                    }, {}
                ],
            ]
        }
    }];


const familyHistory = (title: string, value: string) => [
    {
        style: 'itemHeader',
        text: title,
    }, value
]

export const craftFamilyHistory = (value: FamilyHistory, subheader: SubheaderLayoutFunc): object[] => [
    {
        width: '*',
        style: 'itemElement',
        table: {
            widths: ["auto", "*"],
            body: [
                !!value.familyHistoryCardioVascular ? familyHistory('ENFERMEDAD CARDIO-VASCULAR', value.familyHistoryCardioVascular) : undefined,
                !!value.familyHistoryMetabolic ? familyHistory('ENFERMEDAD METABÓLICA', value.familyHistoryMetabolic) : undefined,
                !!value.familyHistoryNeurologic ? familyHistory('ENFERMEDAD NEUROLÓGICA', value.familyHistoryNeurologic) : undefined,
                !!value.familyHistoryOncologic ? familyHistory('ENFERMEDAD ONCOLÓGICA', value.familyHistoryOncologic) : undefined,
                !!value.familyHistoryInfectious ? familyHistory('ENFERMEDAD INFECCIOSA', value.familyHistoryInfectious) : undefined,
                !!value.familyHistoryHereditary ? familyHistory('ENFERMEDAD HEREDITARIA/CONGÉNITA', value.familyHistoryHereditary) : undefined,
                !!value.familyHistoryDisability ? familyHistory('DISCAPACIDADES', value.familyHistoryDisability) : undefined,
                !!value.familyHistoryOther ? familyHistory('OTROS', value.familyHistoryOther) : undefined,
            ].filter(e => !!e)
        },
    },
];

export const craftExtraActivity = (value: ExtraActivity): object => ({
    width: '*',
    style: 'itemElement',
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
                    text: value.extraActivityDescription,
                }
            ],
        ]
    }
});

export const craftCurrentDisease = (value: CurrentDisease): object => ({
    width: '*',
    style: 'itemElement',
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
                    text: value.currentDiseaseDescription,
                }
            ],
        ]
    }
});

const reviewOfOrgansAndSystem = (title: string, value: string) => [
    {
        style: 'itemHeader',
        text: title,
    }, value
];

export const craftReviewOfOrgansAndSystem = (value: ReviewOfOrgansAndSystem): object[] => [
    {
        width: '*',
        style: 'itemElement',
        table: {
            widths: ["auto", "*"],
            body: [
                !!value.reviewOfOrgansSkin ? reviewOfOrgansAndSystem('PIEL - ANEXOS', value.reviewOfOrgansSkin) : undefined,
                !!value.reviewOfOrgansSenseOrgans ? reviewOfOrgansAndSystem('ÓRGANOS DE LOS SENTIDOS', value.reviewOfOrgansSenseOrgans) : undefined,
                !!value.reviewOfOrgansBreath ? reviewOfOrgansAndSystem('RESPIRATORIO', value.reviewOfOrgansBreath) : undefined,
                !!value.reviewOfOrgansCardiovascular ? reviewOfOrgansAndSystem('CARDIO-VASCULAR', value.reviewOfOrgansCardiovascular) : undefined,
                !!value.reviewOfOrgansDigestive ? reviewOfOrgansAndSystem('DIGESTIVO', value.reviewOfOrgansDigestive) : undefined,
                !!value.reviewOfOrgansUrinary ? reviewOfOrgansAndSystem('GENITO - URINARIO', value.reviewOfOrgansUrinary) : undefined,
                !!value.reviewOfOrgansSkeletalMuscle ? reviewOfOrgansAndSystem('MÚSCULO ESQUELÉTICO', value.reviewOfOrgansSkeletalMuscle) : undefined,
                !!value.reviewOfOrgansEndocrinic ? reviewOfOrgansAndSystem('ENDOCRINO', value.reviewOfOrgansEndocrinic) : undefined,
                !!value.reviewOfOrgansHemoLymphatic ? reviewOfOrgansAndSystem('HEMO LINFÁTICO', value.reviewOfOrgansHemoLymphatic) : undefined,
                !!value.reviewOfOrgansHighlyStrung ? reviewOfOrgansAndSystem('NERVIOSO', value.reviewOfOrgansHighlyStrung) : undefined
            ].filter(e => !!e)
        },
    },
];
export const craftVitalSignsAndAnthropometry = (value: VitalSignsAndAnthropometry, subheader: SubheaderLayoutFunc): object[] => [
    {
        width: '*',
        style: 'itemElement',
        table: {
            widths: ["auto", "auto", "auto", "auto", "auto", "auto", "auto", "auto", "auto"],
            body: [
                [
                    {
                        style: 'itemElement',
                        text: 'PRESIÓN ARTERIAL (mmHg)'
                    },
                    {
                        style: 'itemElement',
                        text: 'TEMPERATURA (°C)'
                    },
                    {
                        style: 'itemElement',
                        text: 'FRECUENCIA CARDIACA (Lat/min)'
                    },
                    {
                        style: 'itemElement',
                        text: 'SATURACIÓN DE OXÍGENO (O2%)'
                    },
                    {
                        style: 'itemElement',
                        text: 'FRECUENCIA RESPIRATORIA (fr/min)'
                    },
                    {
                        style: 'itemElement',
                        text: 'PESO (Kg)'
                    },
                    {
                        style: 'itemElement',
                        text: 'TALLA (cm)'
                    },
                    {
                        style: 'itemElement',
                        text: 'ÍNDICE DE MASA CORPORAL (kg/m2)'
                    },
                    {
                        style: 'itemElement',
                        text: 'PERÍMETRO ABDOMINAL (cm)'
                    },
                ],
                [
                    value.vitalSignsBloodPressure,
                    value.vitalSignsTemperature,
                    value.vitalSignsHeartRate,
                    value.vitalSignsOxygenSaturation,
                    value.vitalSignsRespiratoryRate,
                    value.vitalSignsWeight,
                    value.vitalSignsSize,
                    value.vitalSignsMassIndex,
                    value.vitalSignsAbdominalPerimeter,
                ]
            ]
        },
        layout: {
            fillColor: subheader
        }
    },
];

const physicalItem = (title: string, values: { label: string, value: boolean }[], subheader: SubheaderLayoutFunc): object =>
({
    width: '*',
    table: {
        widths: ["*", "auto"],
        body: [
            [
                {
                    style: 'itemElement',
                    text: title,
                    colSpan: 2,
                }, {}
            ],
            ...values.map(e => [
                e.label, e.value ? 'x' : ' '
            ])
        ]
    },
    layout: {
        fillColor: subheader
    }
});

export const craftPhysicalRegionalExam = (value: PhysicalRegionalExam, subheader: SubheaderLayoutFunc): object[] => [
    {
        width: '*',
        style: 'itemElement',
        table: {
            widths: ["*"],
            body: [
                [
                    {
                        style: 'itemHeader',
                        text: 'REGIONES',
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
        layout: 'noBorders',
        table: {
            widths: ["*", "*", "*", "*", "*"],
            body: [
                [
                    physicalItem('Piel', [
                        { label: 'Cicatrices', value: !!value.examSkinScar },
                        { label: 'Tatuajes', value: !!value.examSkinTattoo },
                        { label: 'Piel y Faneras', value: !!value.examSkinLesions }
                    ], subheader),
                    physicalItem('Oido', [
                        { label: 'C. auditivo externo', value: !!value.examEyeEyelids },
                        { label: 'Pabellón', value: !!value.examEyeConjunctiva },
                        { label: 'Tímpanos', value: !!value.examEyePupils }
                    ], subheader),
                    physicalItem('Nariz', [
                        { label: 'Tabique', value: !!value.examEyeCorneas },
                        { label: 'Cornetes', value: !!value.examEyeMotility },
                        { label: 'Mucosas', value: !!value.examEarAuditoryExternal },
                        { label: 'Senos paranasales', value: !!value.examEarAuricle }
                    ], subheader),
                    physicalItem('Abdomen', [
                        { label: 'Vísceras', value: !!value.examEarEardrum },
                        { label: 'Pared abdominal', value: !!value.examPharynxLips }
                    ], subheader),
                    physicalItem('Pelvis', [
                        { label: 'Pelvis', value: !!value.examPharynxTongue },
                        { label: 'Genitales', value: !!value.examPharynxPharynx }
                    ], subheader),
                ],
                [
                    physicalItem('Ojos', [
                        { label: 'Párpados', value: !!value.examPharynxTonsils },
                        { label: 'Conjuntivas', value: !!value.examPharynxTeeth },
                        { label: 'Pupilas', value: !!value.examNosePartition },
                        { label: 'Córnea', value: !!value.examNoseTurbinates },
                        { label: 'Motilidad', value: !!value.examNoseMucousMembranes },
                    ], subheader),
                    physicalItem('Oro faringe', [
                        { label: 'Labios', value: !!value.examNoseParanasalSinuses },
                        { label: 'Lengua', value: !!value.examNeckThyroid },
                        { label: 'Faringe', value: !!value.examNeckMobility },
                        { label: 'Amígdalas', value: !!value.examChestBreast },
                        { label: 'Dentadura', value: !!value.examChestHeart },
                    ], subheader),
                    physicalItem('Cuello', [
                        { label: 'Tiroides / masas', value: !!value.examChestLungs },
                        { label: 'Movilidad', value: !!value.examChestRibCage },
                    ], subheader),
                    physicalItem('Columna', [
                        { label: 'Flexibilidad', value: !!value.examAbdomenViscera },
                        { label: 'Desviación', value: !!value.examAbdomenAbdominalWall },
                        { label: 'Dolor', value: !!value.examColumnFlexibility }
                    ], subheader),
                    physicalItem('Extremidades', [
                        { label: 'Vascular', value: !!value.examColumnDeviation },
                        { label: 'Miembros superiores', value: !!value.examColumnPain },
                        { label: 'Miembros inferiores', value: !!value.examPelvis }
                    ], subheader),
                ],
                [
                    physicalItem('Tórax', [
                        { label: 'Mamas', value: !!value.examPelvisGenitals },
                        { label: 'Corazón', value: !!value.examLimbVascular },
                        { label: 'Pulmones', value: !!value.examLimbUpper },
                        { label: 'Parrilla Costal', value: !!value.examLimbLower },
                    ], subheader),
                    physicalItem('Neurológico', [
                        { label: 'Fuerza', value: !!value.examNeurologicForce },
                        { label: 'Sensibilidad', value: !!value.examNeurologicSensitivity },
                        { label: 'Marcha', value: !!value.examNeurologicGait },
                        { label: 'Reflejos', value: !!value.examNeurologicReflex },
                    ], subheader), {}, {}, {}
                ],
            ]
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
                        text: 'Observaciones:',
                    }
                ],
                [
                    {
                        stack: [
                            !!value.examSkinScar ? `Cicatrices - ${value.examSkinScar}` : '',
                            !!value.examSkinTattoo ? `Tatuajes - ${value.examSkinTattoo}` : '',
                            !!value.examSkinLesions ? `Piel y Faneras - ${value.examSkinLesions}` : '',
                            !!value.examEyeEyelids ? `C. auditivo externo - ${value.examEyeEyelids}` : '',
                            !!value.examEyeConjunctiva ? `Pabellón - ${value.examEyeConjunctiva}` : '',
                            !!value.examEyePupils ? `Tímpanos - ${value.examEyePupils}` : '',
                            !!value.examEyeCorneas ? `Tabique - ${value.examEyeCorneas}` : '',
                            !!value.examEyeMotility ? `Cornetes - ${value.examEyeMotility}` : '',
                            !!value.examEarAuditoryExternal ? `Mucosas - ${value.examEarAuditoryExternal}` : '',
                            !!value.examEarAuricle ? `Senos paranasales - ${value.examEarAuricle}` : '',
                            !!value.examEarEardrum ? `Vísceras - ${value.examEarEardrum}` : '',
                            !!value.examPharynxLips ? `Pared abdominal - ${value.examPharynxLips}` : '',
                            !!value.examPharynxTongue ? `Pelvis - ${value.examPharynxTongue}` : '',
                            !!value.examPharynxPharynx ? `Genitales - ${value.examPharynxPharynx}` : '',
                            !!value.examPharynxTonsils ? `Párpados - ${value.examPharynxTonsils}` : '',
                            !!value.examPharynxTeeth ? `Conjuntivas - ${value.examPharynxTeeth}` : '',
                            !!value.examNosePartition ? `Pupilas - ${value.examNosePartition}` : '',
                            !!value.examNoseTurbinates ? `Córnea - ${value.examNoseTurbinates}` : '',
                            !!value.examNoseMucousMembranes ? `Motilidad - ${value.examNoseMucousMembranes}` : '',
                            !!value.examNoseParanasalSinuses ? `Labios - ${value.examNoseParanasalSinuses}` : '',
                            !!value.examNeckThyroid ? `Lengua - ${value.examNeckThyroid}` : '',
                            !!value.examNeckMobility ? `Faringe - ${value.examNeckMobility}` : '',
                            !!value.examChestBreast ? `Amígdalas - ${value.examChestBreast}` : '',
                            !!value.examChestHeart ? `Dentadura - ${value.examChestHeart}` : '',
                            !!value.examChestLungs ? `Tiroides / masas - ${value.examChestLungs}` : '',
                            !!value.examChestRibCage ? `Movilidad - ${value.examChestRibCage}` : '',
                            !!value.examAbdomenViscera ? `Flexibilidad - ${value.examAbdomenViscera}` : '',
                            !!value.examAbdomenAbdominalWall ? `Desviación - ${value.examAbdomenAbdominalWall}` : '',
                            !!value.examColumnFlexibility ? `Dolor - ${value.examColumnFlexibility}` : '',
                            !!value.examColumnDeviation ? `Vascular - ${value.examColumnDeviation}` : '',
                            !!value.examColumnPain ? `Miembros superiores - ${value.examColumnPain}` : '',
                            !!value.examPelvis ? `Miembros inferiores - ${value.examPelvis}` : '',
                            !!value.examPelvisGenitals ? `Mamas - ${value.examPelvisGenitals}` : '',
                            !!value.examLimbVascular ? `Corazón - ${value.examLimbVascular}` : '',
                            !!value.examLimbUpper ? `Pulmones - ${value.examLimbUpper}` : '',
                            !!value.examLimbLower ? `Parrilla Costal - ${value.examLimbLower}` : '',
                            !!value.examNeurologicForce ? `Fuerza - ${value.examNeurologicForce}` : '',
                            !!value.examNeurologicSensitivity ? `Sensibilidad - ${value.examNeurologicSensitivity}` : '',
                            !!value.examNeurologicGait ? `Marcha - ${value.examNeurologicGait}` : '',
                            !!value.examNeurologicReflex ? `Reflejos - ${value.examNeurologicReflex}` : '',
                        ],
                    }
                ],
            ]
        }
    }];

export const craftSpecificAndGeneralResults = (value: GeneralExamResultAndSpecific, subheader: SubheaderLayoutFunc): object =>
({
    width: '*',
    style: 'itemElement',
    table: {
        widths: ["auto", "auto", '*'],
        body: [
            [
                {
                    style: 'itemElement',
                    text: 'EXAMEN',
                },
                {
                    style: 'itemElement',
                    text: 'FECHA',
                },
                {
                    style: 'itemElement',
                    text: 'RESULTADOS',
                }
            ],
            ...value.generalExamResults.map(e => [
                {
                    text: e.exam
                },
                {
                    text: formatDate(e.date, 'yyyy/MM/dd')
                },
                {
                    text: e.result
                }
            ]),
            [
                {
                    border: [true, false, true, false],
                    style: 'descriptionItem',
                    text: 'Observaciones:',
                    colSpan: 3,
                }, {}, {}
            ],
            [
                {
                    text: value.generalExamObservation,
                    colSpan: 3,
                }, {}, {}
            ]
        ]
    },
    layout: {
        fillColor: subheader
    }
});

export const craftMedicalDiagnostic = (values: MedicalDiagnostic[], subheader: SubheaderLayoutFunc): object => ({
    width: '*',
    style: 'itemElement',
    table: {
        widths: ["*", 'auto', 'auto', 'auto'],
        body: [
            [
                {
                    style: 'itemElement',
                    text: 'Descripcion',
                },
                {
                    style: 'itemElement',
                    text: 'CIE',
                },
                {
                    style: 'itemElement',
                    text: 'PRE',
                },
                {
                    style: 'itemElement',
                    text: 'DEF',
                }
            ],
            ...values.map(e => [
                e.description,
                e.cie,
                e.pre ? 'Si' : 'No',
                e.def ? 'Si' : 'No'
            ]),
        ]
    },
    layout: {
        fillColor: subheader
    }
});

export const craftMedicalFitnessForJob = (value: MedicalFitnessForJob, subheader: SubheaderLayoutFunc): object => ({
    width: '*',
    style: 'itemElement',
    table: {
        widths: ["auto", "*"],
        body: [
            [
                {
                    style: 'itemElement',
                    text: 'ESTADO',
                },
                value.medicalFitnessType === 'fit'
                    ? 'APTO'
                    : (value.medicalFitnessType === 'fit-observation'
                        ? 'APTO EN OBSERVACION'
                        : (value.medicalFitnessLimitation)
                            ? 'APTO CON LIMITACIONES'
                            : 'NO APTO'),
            ],
            [
                {
                    style: 'itemElement',
                    text: 'OBSERVACION',
                },
                value.medicalFitnessObservation,
            ],
            [
                {
                    style: 'itemElement',
                    text: 'LIMITACION',
                },
                value.medicalFitnessLimitation
            ],
        ]
    },
    layout: {
        fillColor: (_col, _node, rowIndex) => subheader(rowIndex)
    }
});

export const craftRecommendation = (value: RecordRecommendation): object => ({
    width: '*',
    style: 'itemElement',
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
                    text: value.recommendationDescription,
                }
            ],
        ]
    }
});

const createHeader = (headerLayout: HeaderLayoutFunc): CreateHeaderFunc =>
    (text) => ({
        width: '*',
        table: {
            widths: ["*"],
            body: [
                [
                    {
                        text: text,
                        style: 'tableHeader'
                    },
                ],
            ],
        },
        layout: {
            fillColor: headerLayout
        }
    })