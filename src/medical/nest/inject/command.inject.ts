import { Inject } from "@nestjs/common";

export const ClientAddAreaCommandToken = 'ClientAddAreaCommand';
export const ClientAddJobPositionCommandToken = 'ClientAddJobPositionCommand';
export const ClientAddManagementCommandToken = 'ClientAddManagementCommand';
export const ClientAddRecordCommandToken = 'ClientAddRecordCommand';
export const ClientCreateManyCommandToken = 'ClientCreateManyCommand';
export const ClientCreateCommandToken = 'ClientCreateCommand';
export const ClientDeleteCommandToken = 'ClientDeleteCommand';
export const ClientEditCommandToken = 'ClientEditCommand';
export const EmailCreateCommandToken = 'EmailCreateCommand';
export const EmailDefaultCommandToken = 'EmailDefaultCommand';
export const EmailRemoveCommandToken = 'EmailRemoveCommand';
export const OrderCreateManyCommandToken = 'OrderCreateManyCommand';
export const OrderCreateCommandToken = 'OrderCreateCommand';
export const OrderCreatedStatusCommandToken = 'OrderCreatedStatusCommand';
export const OrderSendMailCommandToken = 'OrderSendMailCommand';
export const OrderValidatedStatusCommandToken = 'OrderValidatedStatusCommand';
export const OrderRemoveCommandToken = 'OrderRemoveCommand';
export const DiseaseReportCreateCommandToken = 'DiseaseReportCreateCommand';
export const DiseaseReportEditCommandToken = 'DiseaseReportEditCommand';
export const DiseaseReportRemoveCommandToken = 'DiseaseReportRemoveCommand';
export const ReportAddContentCommandToken = 'ReportAddContentCommand';
export const ReportUploadFromStreamCommandToken = 'ReportUploadFromStreamCommand';
export const ReportRemoveContentCommandToken = 'ReportRemoveContentCommand';
export const ResultRemoveFileCommandToken = 'ResultRemoveFileCommand';
export const ResultUploadFromBase64CommandToken = 'ResultUploadFromBase64Command';
export const ResultUploadFromStreamCommandToken = 'ResultUploadFromStreamCommand';
export const TestCheckFileCommandToken = 'TestCheckFileCommand';
export const TestCreateCommandToken = 'TestCreateCommand';
export const TestCheckCommandToken = 'TestCheckCommand';
export const TestEditExamCommandToken = 'TestEditExamCommand';
export const TestRemoveCommandToken = 'TestRemoveCommand';
export const TestUncheckCommandToken = 'TestUncheckCommand';

const command = {
    ClientAddArea: ClientAddAreaCommandToken,
    ClientAddJobPosition: ClientAddJobPositionCommandToken,
    ClientAddManagement: ClientAddManagementCommandToken,
    ClientAddRecord: ClientAddRecordCommandToken,
    ClientCreate: ClientCreateCommandToken,
    ClientDelete: ClientDeleteCommandToken,
    ClientEdit: ClientEditCommandToken,
    ClientCreateMany: ClientCreateManyCommandToken,
    EmailCreate: EmailCreateCommandToken,
    EmailDefault: EmailDefaultCommandToken,
    EmailRemove: EmailRemoveCommandToken,
    OrderCreateMany: OrderCreateManyCommandToken,
    OrderCreate: OrderCreateCommandToken,
    OrderCreatedStatus: OrderCreatedStatusCommandToken,
    OrderSendMail: OrderSendMailCommandToken,
    OrderValidatedStatus: OrderValidatedStatusCommandToken,
    OrderRemove: OrderRemoveCommandToken,
    DiseaseReportCreate: DiseaseReportCreateCommandToken,
    DiseaseReportEdit: DiseaseReportEditCommandToken,
    DiseaseReportRemove: DiseaseReportRemoveCommandToken,
    ReportAddContent: ReportAddContentCommandToken,
    ReportUploadFromStream: ReportUploadFromStreamCommandToken,
    ReportRemoveContent: ReportRemoveContentCommandToken,
    ResultRemoveFile: ResultRemoveFileCommandToken,
    ResultUploadFromBase64: ResultUploadFromBase64CommandToken,
    ResultUploadFromStream: ResultUploadFromStreamCommandToken,
    TestCheckFile: TestCheckFileCommandToken,
    TestCreate: TestCreateCommandToken,
    TestCheck: TestCheckCommandToken,
    TestEditExam: TestEditExamCommandToken,
    TestRemove: TestRemoveCommandToken,
    TestUncheck: TestUncheckCommandToken,
}

export const InjectCommand = (token: keyof typeof command) => Inject(command[token]);