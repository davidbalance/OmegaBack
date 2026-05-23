import { ClientRecordFilenameFunc } from "@omega/medical/application/commands/client/client-add-record.command";
import { formatDate } from "date-fns";

export const reportFilenameHelper: ClientRecordFilenameFunc = (e) => {
    return `${e.toLowerCase()}_${formatDate(new Date(), 'yyyy_MM_dd_HH_mm_ss')}.pdf`
}