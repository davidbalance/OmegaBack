export type ChecklistFormat = {
    logoBase64: string;
    checkInDate: string;
    checkInTime: string;
    serviceDate: string;
    checkOutTime: string;
    jobPosition: string;
    patientFullName: string;
    patientDni: string;
    patientAge: string;
    companyName: string;
    companyRuc: string;
    orderProcess: string;
    checklist: ChecklistItem[]
}

export type ChecklistItem = {
  name: string;
  isChecked: boolean;
  hexColor: string;
}