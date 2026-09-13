import { OrderChecklistDataParseFunc } from "@omega/medical/application/queries/order/order-checklist-get-file.query";
import { formatDate } from "date-fns";
import { ChecklistFormat } from "../types/checklist-format";

export const checklistParser = (logoBase64: string): OrderChecklistDataParseFunc =>
    (values): ChecklistFormat => {
        const order = values[0];

        return {
            logoBase64: logoBase64,
            checkInDate: formatDate(new Date, 'yyyy/MM/dd'),
            checkInTime: "",
            serviceDate: "",
            checkOutTime: "",
            jobPosition: order.locationJobPosition ?? "",
            patientFullName: `${order.patientName} ${order.patientLastname}`,
            patientDni: order.patientDni,
            patientAge: "",
            companyName: order.locationCompanyName,
            companyRuc: order.locationCompanyRuc,
            orderProcess: order.orderProcess,
            checklist: values.filter(e => !e.testCheck).map(e => e.examName)
        }
    }