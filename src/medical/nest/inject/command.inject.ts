import { Inject } from "@nestjs/common";

export const ClientAddAreaCommandToken = 'ClientAddAreaCommand';
export const ClientAddJobPositionCommandToken = 'ClientAddJobPositionCommand';
export const ClientAddManagementCommandToken = 'ClientAddManagementCommand';
export const ClientAddRecordCommandToken = 'ClientAddRecordCommand';
export const ClientUpdateRecordCommandToken = 'ClientUpdateRecordCommand';
export const ClientCompleteRecordCommandToken = 'ClientCompleteRecordCommand';
export const ClientCreateManyCommandToken = 'ClientCreateManyCommand';
export const ClientCreateCommandToken = 'ClientCreateCommand';
export const ClientDeleteCommandToken = 'ClientDeleteCommand';
export const ClientEditCommandToken = 'ClientEditCommand';
export const EmailCreateCommandToken = 'EmailCreateCommand';
export const EmailDefaultCommandToken = 'EmailDefaultCommand';
export const EmailRemoveCommandToken = 'EmailRemoveCommand';

export const OrderCreateManyCommandToken = 'OrderCreateManyCommand';
export const OrderCreateCommandToken = 'OrderCreateCommand';
export const OrderUpdateProcessCommandToken = 'OrderUpdateProcessCommand';
export const OrderCreatedStatusCommandToken = 'OrderCreatedStatusCommand';
export const OrderSendMailCommandToken = 'OrderSendMailCommand';
export const OrderValidatedStatusCommandToken = 'OrderValidatedStatusCommand';
export const OrderRemoveCommandToken = 'OrderRemoveCommand';
export const OrderCreateFromExternalSourceCommandToken = 'OrderCreateFromExternalSourceCommand';

export const DiseaseReportCreateCommandToken = 'DiseaseReportCreateCommand';
export const DiseaseReportEditCommandToken = 'DiseaseReportEditCommand';
export const DiseaseReportRemoveCommandToken = 'DiseaseReportRemoveCommand';
export const ResultRemoveFileCommandToken = 'ResultRemoveFileCommand';
export const ResultUploadBase64CommandToken = 'ResultUploadBase64Command';
export const ResultUploadBase64FromExternalSourceCommandToken = 'ResultUploadBase64FromExternalSourceCommand';
export const ResultUploadBufferCommandToken = 'ResultUploadBufferCommand';
export const ResultUploadBufferFromExternalSourceCommandToken = 'ResultUploadBufferFromExternalSourceCommand';
export const TestCheckFileCommandToken = 'TestCheckFileCommand';
export const TestCreateCommandToken = 'TestCreateCommand';
export const TestCheckCommandToken = 'TestCheckCommand';
export const TestEditExamCommandToken = 'TestEditExamCommand';
export const TestRemoveCommandToken = 'TestRemoveCommand';
export const TestUncheckCommandToken = 'TestUncheckCommand';
export const TestCreateFromExternalSourceCommandToken = 'TestCreateFromExternalSourceCommand';

const command = {
    ClientAddArea: ClientAddAreaCommandToken,
    ClientAddJobPosition: ClientAddJobPositionCommandToken,
    ClientAddManagement: ClientAddManagementCommandToken,
    ClientAddRecord: ClientAddRecordCommandToken,
    ClientUpdateRecord: ClientUpdateRecordCommandToken,
    ClientCompleteRecord: ClientCompleteRecordCommandToken,
    ClientCreate: ClientCreateCommandToken,
    ClientDelete: ClientDeleteCommandToken,
    ClientEdit: ClientEditCommandToken,
    ClientCreateMany: ClientCreateManyCommandToken,
    EmailCreate: EmailCreateCommandToken,
    EmailDefault: EmailDefaultCommandToken,
    EmailRemove: EmailRemoveCommandToken,

    OrderCreateMany: OrderCreateManyCommandToken,
    OrderCreate: OrderCreateCommandToken,
    OrderUpdateProcess: OrderUpdateProcessCommandToken,
    OrderCreatedStatus: OrderCreatedStatusCommandToken,
    OrderSendMail: OrderSendMailCommandToken,
    OrderValidatedStatus: OrderValidatedStatusCommandToken,
    OrderRemove: OrderRemoveCommandToken,
    OrderCreateFromExternalSource: OrderCreateFromExternalSourceCommandToken,

    DiseaseReportCreate: DiseaseReportCreateCommandToken,
    DiseaseReportEdit: DiseaseReportEditCommandToken,
    DiseaseReportRemove: DiseaseReportRemoveCommandToken,
    ResultRemoveFile: ResultRemoveFileCommandToken,
    ResultUploadBase64: ResultUploadBase64CommandToken,
    ResultUploadBase64FromExternalSource: ResultUploadBase64FromExternalSourceCommandToken,
    ResultUploadBuffer: ResultUploadBufferCommandToken,
    ResultUploadBufferFromExternalSource: ResultUploadBufferFromExternalSourceCommandToken,
    TestCheckFile: TestCheckFileCommandToken,
    TestCreate: TestCreateCommandToken,
    TestCheck: TestCheckCommandToken,
    TestEditExam: TestEditExamCommandToken,
    TestRemove: TestRemoveCommandToken,
    TestUncheck: TestUncheckCommandToken,
    TestCreateFromExternalSource: TestCreateFromExternalSourceCommandToken,
}

export const InjectCommand = (token: keyof typeof command) => Inject(command[token]);