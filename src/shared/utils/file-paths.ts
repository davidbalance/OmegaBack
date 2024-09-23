/**
 * Returns the a path where files can be stored
 * @param param0 
 * @returns string
 */
export const fileOrderPath = ({ dni, order }: { dni: string, order: number }) => `medical-report-pdf/${dni}/${order.toString().padStart(9, '0')}/order`

/**
 * Returns the a path where files can be stored
 * @param param0 
 * @returns string
 */
export const fileResultPath = ({ dni, order }: { dni: string, order: number }) => `medical-report-pdf/${dni}/${order.toString().padStart(9, '0')}/result`

/**
 * Returns the a path where files can be stored
 * @param param0 
 * @returns string
 */
export const fileReportPath = ({ dni, order }: { dni: string, order: number }) => `medical-report-pdf/${dni}/${order.toString().padStart(9, '0')}/report`

/**
 * Returns the a path where files can be stored
 * @param param0 
 * @returns string
 */
export const signaturePath = ({ dni }: { dni: string }) => `signatures/${dni}`;