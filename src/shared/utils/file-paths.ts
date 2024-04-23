/**
 * Returns the a path where files can be stored
 * @param param0 
 * @returns string
 */
export const fileResultPath = ({ dni, order }: { dni: string, order: number }) => `medical-report-pdf/${dni}/${order}/result`

/**
 * Returns the a path where files can be stored
 * @param param0 
 * @returns string
 */
export const fileReportPath = ({ dni, order }: { dni: string, order: number }) => `medical-report-pdf/${dni}/${order}/report`

/**
 * Returns the a path where files can be stored
 * @param param0 
 * @returns string
 */
export const signaturePath = ({ dni }: { dni: string }) => `signatures/${dni}`;