import { MedicalOrder } from "@/medical/medical-order/entities/medical-order.entity";
import { OrderStatus } from "@/medical/medical-order/enums";

const stubMedicalOrder = (id: number): MedicalOrder => ({
    id: id,
    corporativeName: "Test corporative name",
    companyRuc: "1234567890001",
    companyName: "Test company name",
    branchName: "Test branch name",
    process: "Test process",
    mailStatus: false,
    orderStatus: OrderStatus.CREATED,
    results: [
        {
            id: 1,
            hasFile: true,
            examType: "Exam type",
            examSubtype: "Exam subtype",
            examName: "Exam",
            doctorDni: "1234567890",
            doctorFullname: "Test name",
            doctorSignature: "Test name",
            order: undefined,
            report: {
                id: 1,
                fileAddress: "/path/to/file",
                content: "test content",
                hasFile: true,
                order: id,
                patientDni: "1234567890",
                patientFullname: "Test name",
                patientBirthday: new Date(),
                examName: "Exam",
                companyName: "Company name",
                doctorDni: "1234567890",
                doctorFullname: "Doctor fill name",
                doctorSignature: "/path/to/signature",
                sendAttributes: [],
                createAt: new Date(),
                updateAt: new Date()
            },
            externalKey: undefined,
            sendAttributes: [],
            createAt: new Date(),
            updateAt: new Date()
        },
        {
            id: 2,
            hasFile: true,
            examType: "Exam type",
            examSubtype: "Exam subtype",
            examName: "Exam",
            doctorDni: "1234567890",
            doctorFullname: "Test name",
            doctorSignature: "Test name",
            order: undefined,
            report: undefined,
            externalKey: undefined,
            sendAttributes: [],
            createAt: new Date(),
            updateAt: new Date()
        }
    ],
    externalKey: undefined,
    client: {
        id: 1,
        dni: "1234567890",
        name: "Test name",
        lastname: "Test lastname",
        birthday: new Date(),
        gender: "male",
        jobPositionName: "Test position",
        managementId: 1,
        managementName: "Test management",
        areaId: 1,
        areaName: "Test area",
        medicalOrders: [],
        email: [],
        createAt: undefined,
        updateAt: undefined
    },
    createAt: new Date(),
    updateAt: new Date()
});

export const mockMedicalOrder = () => stubMedicalOrder(1);
export const mockMedicalOrders = () => [1, 2, 3, 4, 5].map(stubMedicalOrder);