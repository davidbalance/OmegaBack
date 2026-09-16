import { OrderChecklistDataParseFunc } from "@omega/medical/application/queries/order/order-checklist-get-file.query";
import { formatDate } from "date-fns";
import { ChecklistFormat, ChecklistItem } from "../types/checklist-format";
import { OrderChecklistModel } from "@omega/medical/core/model/order/order-checklist.model";

const examColorDic: Record<string, string> = {
  "rx_ap_y_l_columna_cervical": "#E8D7F5",
  "rx_ap_y_lt_dorsal": "#A3E4D7",
  "rx_ap_y_l_columna_lumbar": "#FFD8A8",
  "rx_ap_y_l_lumbosacra": "#D3F9D8",
  "rx_st_de_torax": "#FFF3BF",
  "rx_dorsolumbar_ap_y_lt": "#D7C4B7",
  "rx_ap_y_l_rodillas": "#FFD6E8",
  "rx_ap_y_l_tobillo": "#E2E8F0"
}

const mapChecklistItem = (item: OrderChecklistModel): ChecklistItem => {
  const examKey = item.examName.toLowerCase().replaceAll(/\s+/g, "_");

  const color: string = examKey in examColorDic ? examColorDic[examKey] : "#FFFFFF";

  return {
    name: item.examName,
    isChecked: item.testCheck,
    hexColor: color
  }
}

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
      checklist: values.filter(e => !e.testCheck).map(mapChecklistItem)
    }
  }
