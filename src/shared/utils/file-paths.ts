export const fileResultPath = ({ dni, order }: { dni: string, order: number }) => `medical-report-pdf/${dni}/${order}/result`
export const fileReportPath = ({ dni, order }: { dni: string, order: number }) => `medical-report-pdf/${dni}/${order}/report`

export const signaturePath = ({ dni }: { dni: string }) => `signatures/${dni}`;