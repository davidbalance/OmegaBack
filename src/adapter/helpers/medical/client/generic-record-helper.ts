import { GenericRecord } from "@omega/medical/application/commands/client/client-add-record.command"
import { CertificateRecord } from "@omega/medical/application/type/certificate-record"
import { InitialRecord } from "@omega/medical/application/type/initial-record"
import { PeriodicRecord } from "@omega/medical/application/type/periodic-record"
import { ReintegrateRecord } from "@omega/medical/application/type/reintegrate-record"
import { RetirementRecord } from "@omega/medical/application/type/retirement-record"
import { createInitialRecord } from "./initial-record-helper"
import { JobAccident, LifeStyle, MedicalAndSurgicalHistory, MedicalConsultation, OccupationalDisease, PhysicalRegionalExam, ToxicDetail } from "@omega/medical/application/type/record.type"
import { formatDate } from "date-fns"

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
    if (isPeriodicRecord(record)) { }
    if (isReintegrateRecord(record)) { }
    if (isRetirementRecord(record)) { }
    if (isCertificateRecord(record)) { }

    return [];
}

export const craftSpacing = () => ({
    text: '',
    marginTop: 10
})

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
                        text: `ESPECIFICAR: ${value.jobAccidentDescription ?? ''}`,
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
                        text: `ESPECIFICAR: ${value.occupationalDiseaseDescription ?? ''}`,
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
                        { label: 'Cicatrices', value: false },
                        { label: 'Tatuajes', value: false },
                        { label: 'Piel y Faneras', value: false }
                    ], subheader),
                    physicalItem('Oido', [
                        { label: 'C. auditivo externo', value: false },
                        { label: 'Pabellón', value: false },
                        { label: 'Tímpanos', value: false }
                    ], subheader),
                    physicalItem('Nariz', [
                        { label: 'Tabique', value: false },
                        { label: 'Cornetes', value: false },
                        { label: 'Mucosas', value: false },
                        { label: 'Senos paranasales', value: false }
                    ], subheader),
                    physicalItem('Abdomen', [
                        { label: 'Vísceras', value: false },
                        { label: 'Pared abdominal', value: false }
                    ], subheader),
                    physicalItem('Pelvis', [
                        { label: 'Pelvis', value: false },
                        { label: 'Genitales', value: false }
                    ], subheader),
                ],
                [
                    physicalItem('Ojos', [
                        { label: 'Párpados', value: false },
                        { label: 'Conjuntivas', value: false },
                        { label: 'Pupilas', value: false },
                        { label: 'Córnea', value: false },
                        { label: 'Motilidad', value: false },
                    ], subheader),
                    physicalItem('Oro faringe', [
                        { label: 'Labios', value: false },
                        { label: 'Lengua', value: false },
                        { label: 'Faringe', value: false },
                        { label: 'Amígdalas', value: false },
                        { label: 'Dentadura', value: false },
                    ], subheader),
                    physicalItem('Cuello', [
                        { label: 'Tiroides / masas', value: false },
                        { label: 'Movilidad', value: false },
                    ], subheader),
                    physicalItem('Columna', [
                        { label: 'Flexibilidad', value: false },
                        { label: 'Desviación', value: false },
                        { label: 'Dolor', value: false }
                    ], subheader),
                    physicalItem('Extremidades', [
                        { label: 'Vascular', value: false },
                        { label: 'Miembros superiores', value: false },
                        { label: 'Miembros inferiores', value: false }
                    ], subheader),
                ],
                [
                    physicalItem('Tórax', [
                        { label: 'Mamas', value: false },
                        { label: 'Corazón', value: false },
                        { label: 'Pulmones', value: false },
                        { label: 'Parrilla Costal', value: false },
                    ], subheader),
                    physicalItem('Neurológico', [
                        { label: 'Fuerza', value: false },
                        { label: 'Sensibilidad', value: false },
                        { label: 'Marcha', value: false },
                        { label: 'Reflejos', value: false },
                    ], subheader), {}, {}, {}
                ],
                [
                    {
                        border: [true, true, true, false],
                        style: 'descriptionItem',
                        text: 'Observaciones:',
                        colSpan: 5
                    }, {}, {}, {}, {}
                ]
            ]
        }
    }
    /* ,
    {
        width: '*',
        table: {
            widths: ["*", "auto", "*", "auto", "*", "auto", "*", "auto", "*", "auto"],
            body: [
                [
                    {
                        style: 'itemElement',
                        text: 'Piel',
                        colSpan: 2
                    }, {}, '', '', '', '', '', '', '', ''
                ],
                ['Cicatrices', '', '', '', '', '', '', '', '', '',],
                ['Tatuajes', '', '', '', '', '', '', '', '', '',],
                ['Piel y Faneras', '', '', '', '', '', '', '', '', '',],
            ]
        }
    } */];

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