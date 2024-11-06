/**
 * Returns the a path where files can be stored
 * @param param0 
 * @returns string
 */
export const fileResultPath = ({
    year,
    corporativeGroup,
    companyName,
    companyRuc,
    branch,
    patientDni,
    patientName,
    order
}: {
    year: string,
    corporativeGroup: string,
    companyName: string,
    companyRuc: string,
    branch: string,
    patientDni: string,
    patientName: string,
    order: number,
}) => `disk/medical-file/results/${year}/${corporativeGroup}/${companyRuc.padStart(13, '0')}_${companyName}/${branch}/${patientDni.padStart(10, '0')}_${patientName.toUpperCase()}/${order.toString().padStart(9, '0')}`

/**
 * Returns the a path where files can be stored
 * @param param0 
 * @returns string
 */
export const fileReportPath = ({ dni, order }: { dni: string, order: number }) => `disk/medical-file/reports/${dni}/${order.toString().padStart(9, '0')}`

/**
 * Returns the a path where files can be stored
 * @param param0 
 * @returns string
 */
export const signaturePath = ({ dni }: { dni: string }) => `disk/signatures/${dni}`;