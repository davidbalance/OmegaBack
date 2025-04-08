import { Module } from "@nestjs/common";
import { ClientAddAreaCommandProvider } from "./nest/command/client/client-add-area.nest-command";
import { ClientAddJobPositionCommandProvider } from "./nest/command/client/client-add-job-position.nest-command";
import { ClientAddManagementCommandProvider } from "./nest/command/client/client-add-management.nest-command";
import { ClientCreateCommandProvider } from "./nest/command/client/client-create.nest-command";
import { ClientDeleteCommandProvider } from "./nest/command/client/client-delete.nest-command";
import { ClientEditCommandProvider } from "./nest/command/client/client-edit.nest-command";
import { EmailCreateCommandProvider } from "./nest/command/client/email-create.nest-command";
import { EmailDefaultCommandProvider } from "./nest/command/client/email-default.nest-command";
import { EmailRemoveCommandProvider } from "./nest/command/client/email-remove.nest-command";
import { OrderCreateCommandProvider } from "./nest/command/order/order-create.nest-command";
import { OrderSendMailCommandProvider } from "./nest/command/order/order-send-mail.nest-command";
import { DiseaseReportCreateCommandProvider } from "./nest/command/test/disease-report-create.nest-command";
import { DiseaseReportEditCommandProvider } from "./nest/command/test/disease-report-edit.nest-command";
import { DiseaseReportRemoveCommandProvider } from "./nest/command/test/disease-report-remove.nest-command";
import { ReportAddContentCommandProvider } from "./nest/command/test/report-add-content.nest-command";
import { ReportRemoveContentCommandProvider } from "./nest/command/test/report-remove-content.nest-command";
import { ResultRemoveFileCommandProvider } from "./nest/command/test/result-remove-file.nest-command";
import { ClientAreaFindOneQueryProvider } from "./nest/query/client/client-area-find-one.nest-query";
import { ClientDoctorFindManyQueryProvider } from "./nest/query/client/client-doctor-find-many.nest-query";
import { ClientEmailFindManyQueryProvider } from "./nest/query/client/client-email-find-many.nest-query";
import { ClientFindManyByCompanyRucQueryProvider } from "./nest/query/client/client-find-many-by-company-ruc.nest-query";
import { ClientFindManyQueryProvider } from "./nest/query/client/client-find-many.nest-query";
import { ClientFindOneByDniQueryProvider } from "./nest/query/client/client-find-one-by-dni.nest-query";
import { ClientFindOneQueryProvider } from "./nest/query/client/client-find-one.nest-query";
import { ClientJobPositionFindOneQueryProvider } from "./nest/query/client/client-job-position-find-one.nest-query";
import { ClientManagementFindOneQueryProvider } from "./nest/query/client/client-management-find-one.nest-query";
import { OrderChecklistFindManyQueryProvider } from "./nest/query/order/order-checklist-find-many.nest-query";
import { OrderChecklistGetFileQueryProvider } from "./nest/query/order/order-checklist-get-file.nest-query";
import { OrderCloudFindManyQueryProvider } from "./nest/query/order/order-cloud-find-many.nest-query";
import { OrderDoctorFindManyQueryProvider } from "./nest/query/order/order-doctor-find-many.nest-query";
import { OrderPatientFindManyQueryProvider } from "./nest/query/order/order-patient.find-many.nest-query";
import { OrderProcessFindManyQueryProvider } from "./nest/query/order/order-process.find-many.nest-query";
import { OrderYearFindManyQueryProvider } from "./nest/query/order/order-year.find-many.nest-query";
import { OrderFindManyQueryProvider } from "./nest/query/order/order.find-many.nest-query";
import { OrderFindOneQueryProvider } from "./nest/query/order/order.find-one.nest-query";
import { DiseaseReportFindManyQueryProvider } from "./nest/query/test/disease-report-find-many.nest-query";
import { DiseaseReportFindOneQueryProvider } from "./nest/query/test/disease-report-find-one.nest-query";
import { ReportGetFileQueryProvider } from "./nest/query/test/report-get-file.nest-query";
import { ResultGetFileQueryProvider } from "./nest/query/test/result-get-file.nest-query";
import { ResultGetFilepathQueryProvider } from "./nest/query/test/result-get-filepath.nest-query";
import { TestFindManyQueryProvider } from "./nest/query/test/test-find-many.query";
import { TestReportGetFileQueryProvider } from "./nest/query/test/test-report-get-file.query";
import { LocalEmailModule } from "@email/local-email";
import { LocalFileModule } from "local-file/local-file";
import { LocalPdfModule } from "@local-pdf/local-pdf";
import { LocalSpreadsheetModule } from "local-spreadsheet/local-spreadsheet";
import { HtmlLoaderModule } from "@html-loader/html-loader";
import { OrderHelperModule } from "@omega/adapter/helpers/medical/order/order-helper.module";
import { TestHelperModule } from "@omega/adapter/helpers/medical/test/test-helper.module";
import { ClientReadController } from "./controller/read/client_read.controller";
import { ClientWriteController } from "./controller/write/client_write.controller";
import { OrderProcessReadController } from "./controller/read/order_process_read.controller";
import { OrderReadController } from "./controller/read/order_read.controller";
import { OrderYearReadController } from "./controller/read/order_year_read.controller";
import { OrderWriteController } from "./controller/write/order_write.controller";
import { TestReadController } from "./controller/read/test_read.controller";
import { ReportFindOneQueryProvider } from "./nest/query/test/report-find-one.nest-query";
import { TestFindOneQueryProvider } from "./nest/query/test/test-find-one.query";
import { TestEditExamCommandProvider } from "./nest/command/test/test_edit_exam.nest-command";
import { OrderCreatedStatusCommandProvider } from "./nest/command/order/order_created_status.nest_command";
import { OrderValidatedStatusCommandProvider } from "./nest/command/order/order_validated_status.nest_command";
import { PatientProxyModule } from "@omega/adapter/proxy/patient_proxy/patient_proxy.module";
import { TestCreateCommandProvider } from "./nest/command/test/test-create.nest-command";
import { TestCheckCommandProvider } from "./nest/command/test/test_check.nest-command";
import { TestUncheckCommandProvider } from "./nest/command/test/test_uncheck.nest_command";
import { TestGetZipQueryProvider } from "./nest/query/test/test_get_zip.nest_query";
import { FileReadController } from "./controller/read/file_read.controller";
import { LocalZipModule } from "@local-zip/local-zip";
import { TestCheckFileCommandProvider } from "./nest/command/test/test_check_file.nest_command";
import { TestFileResultReportQueryProvider } from "./nest/query/test/test_file_result_report.nest_query";
import { TestFileResultCountQueryProvider } from "./nest/query/test/test_file_result_count.nest_query";
import { ClientAddRecordCommandProvider } from "./nest/command/client/client-add-record.nest-command";
import { ClientRecordFindOneQueryProvider } from "./nest/query/client/client-record-find-one.nest-query";
import { ClientHelperModule } from "@omega/adapter/helpers/medical/client/client-helper.module";
import { RecordReadController } from "./controller/read/record_read.controller";
import { ClientRecordFindManyQueryProvider } from "./nest/query/client/client-record-find-many.nest-query";
import { OrderRemoveCommandProvider } from "./nest/command/order/order-remove.nest-command";
import { LocalIncrementModule } from "@local-increment/local-increment";
import { ClientCreateManyCommandProvider } from "./nest/command/client/client-create-many.nest-command";
import { OrderCreateManyCommandProvider } from "./nest/command/order/order-create-many.nest-command";
import { OrderFindMassiveLoadTemplateQueryProvider } from "./nest/query/order/order-find-massive-load-template.nest-query";
import { ClientFindMassiveLoadTemplateQueryProvider } from "./nest/query/client/client-find-massive-load-template.nest-query";
import { TestRemoveCommandProvider } from "./nest/command/test/test-remove.nest-command";
import { LaboratoryProxyModule } from "@omega/adapter/proxy/laboratory-proxy/laboratory-proxy.module";
import { OrderCloudReadController } from "./controller/read/order-cloud-read.controller";
import { TestFindOneByExternalKeyQueryProvider } from "./nest/query/test/test-find-one-by-external-key.query";
import { OrderFindOneByExternalKeyQueryProvider } from "./nest/query/order/order.find-one-by-external-key.nest-query";
import { OrderCreateFromExternalSourceCommandProvider } from "./nest/command/order/order-create-from-external-source.nest-command";
import { TestCreateFromExternalSourceCommandProvider } from "./nest/command/test/test-create-from-external-source.nest-command";
import { CreateOrderFromExternalSourceServiceProvider } from "./nest/service/create-order-from-external-source.nest-service";
import { PatientExternalSourceResolverProvider } from "./nest/resolver/patient-external-source.nest-resolver";
import { OrderExternalSourceResolverProvider } from "./nest/resolver/order-external-source.nest-resolver";
import { TestExternalSourceResolverProvider } from "./nest/resolver/test-external-source.nest-resolver";
import { CreatePatientFromExternalSourceServiceProvider } from "./nest/service/create-patient-from-external-source.nest-service";
import { CreateTestFromExternalSourceServiceProvider } from "./nest/service/create-test-from-external-source.nest-service";
import { ClientExternalController } from "./controller/external/client-external.controller";
import { OrderExternalController } from "./controller/external/order-external.controller";
import { TestExternalController } from "./controller/external/test-external.controller";
import { ReportUploadBufferCommandProvider } from "./nest/command/test/report-upload-buffer.nest-command";
import { ResultUploadBase64CommandProvider } from "./nest/command/test/result-upload-base64.nest-command";
import { ResultUploadBufferCommandProvider } from "./nest/command/test/result-upload-buffer.nest-command";
import { ResultUploadBase64FromExternalSourceCommandProvider } from "./nest/command/test/result-upload-base64-from-external-source.nest-command";
import { ResultUploadBufferFromExternalSourceCommandProvider } from "./nest/command/test/result-upload-buffer-from-external-source.nest-command";
import { TestWriteController } from "./controller/write/test-write.controller";
import { ResultGetFileFromExternalSourceQueryProvider } from "./nest/query/test/result-get-file-from-external-source.nest-query";
import { OrderExternalNotificationDispatcherProvider } from "./nest/notification-dispatcher/order-external.nest-notification-dispatcher";
import { TestExternalNotificationDispatcherProvider } from "./nest/notification-dispatcher/test-external.nest-notification-dispatcher";
import { PatientExternalNotificationDispatcherProvider } from "./nest/notification-dispatcher/patient-external.nest-notification-dispatcher";
import { CreateManyTestFromExternalSourceServiceProvider } from "./nest/service/create-many-test-from-external-source.nest-service";

@Module({
    imports: [
        LocalEmailModule,
        LocalFileModule,
        LocalPdfModule,
        LocalSpreadsheetModule,
        HtmlLoaderModule,
        ClientHelperModule,
        OrderHelperModule,
        TestHelperModule,
        PatientProxyModule,
        LocalZipModule,
        LocalIncrementModule,
        LaboratoryProxyModule
    ],
    controllers: [
        ClientExternalController,
        OrderExternalController,
        TestExternalController,

        ClientReadController,
        ClientWriteController,
        FileReadController,
        OrderProcessReadController,
        OrderReadController,
        OrderCloudReadController,
        OrderYearReadController,
        OrderWriteController,
        TestReadController,
        TestWriteController,
        RecordReadController
    ],
    providers: [

        PatientExternalSourceResolverProvider,
        OrderExternalSourceResolverProvider,
        TestExternalSourceResolverProvider,

        CreateManyTestFromExternalSourceServiceProvider,
        CreatePatientFromExternalSourceServiceProvider,
        CreateOrderFromExternalSourceServiceProvider,
        CreateTestFromExternalSourceServiceProvider,
        ResultGetFileFromExternalSourceQueryProvider,

        PatientExternalNotificationDispatcherProvider,
        OrderExternalNotificationDispatcherProvider,
        TestExternalNotificationDispatcherProvider,

        ClientAddAreaCommandProvider,
        ClientAddJobPositionCommandProvider,
        ClientAddManagementCommandProvider,
        ClientAddRecordCommandProvider,
        ClientCreateManyCommandProvider,
        ClientRecordFindOneQueryProvider,
        ClientCreateCommandProvider,
        ClientDeleteCommandProvider,
        ClientEditCommandProvider,
        EmailCreateCommandProvider,
        EmailDefaultCommandProvider,
        EmailRemoveCommandProvider,
        OrderCreateManyCommandProvider,
        OrderCreateFromExternalSourceCommandProvider,
        OrderCreateCommandProvider,
        OrderCreatedStatusCommandProvider,
        OrderSendMailCommandProvider,
        OrderValidatedStatusCommandProvider,
        OrderRemoveCommandProvider,
        DiseaseReportCreateCommandProvider,
        DiseaseReportEditCommandProvider,
        DiseaseReportRemoveCommandProvider,
        ReportAddContentCommandProvider,
        ReportUploadBufferCommandProvider,
        ReportRemoveContentCommandProvider,
        ResultRemoveFileCommandProvider,
        ResultUploadBase64CommandProvider,
        ResultUploadBase64FromExternalSourceCommandProvider,
        ResultUploadBufferCommandProvider,
        ResultUploadBufferFromExternalSourceCommandProvider,
        TestCheckFileCommandProvider,
        TestCheckCommandProvider,
        TestCreateFromExternalSourceCommandProvider,
        TestCreateCommandProvider,
        TestRemoveCommandProvider,
        TestUncheckCommandProvider,
        TestEditExamCommandProvider,
        ClientAreaFindOneQueryProvider,
        ClientDoctorFindManyQueryProvider,
        ClientEmailFindManyQueryProvider,
        ClientFindManyByCompanyRucQueryProvider,
        ClientFindManyQueryProvider,
        ClientFindMassiveLoadTemplateQueryProvider,
        ClientFindOneByDniQueryProvider,
        ClientFindOneQueryProvider,
        ClientRecordFindManyQueryProvider,
        ClientRecordFindOneQueryProvider,
        ClientJobPositionFindOneQueryProvider,
        ClientManagementFindOneQueryProvider,
        OrderChecklistFindManyQueryProvider,
        OrderChecklistGetFileQueryProvider,
        OrderCloudFindManyQueryProvider,
        OrderDoctorFindManyQueryProvider,
        OrderFindMassiveLoadTemplateQueryProvider,
        OrderPatientFindManyQueryProvider,
        OrderProcessFindManyQueryProvider,
        OrderYearFindManyQueryProvider,
        OrderFindManyQueryProvider,
        OrderFindOneQueryProvider,
        OrderFindOneByExternalKeyQueryProvider,
        DiseaseReportFindManyQueryProvider,
        DiseaseReportFindOneQueryProvider,
        ReportGetFileQueryProvider,
        ResultGetFileQueryProvider,
        ResultGetFilepathQueryProvider,
        ReportFindOneQueryProvider,
        TestFileResultCountQueryProvider,
        TestFileResultReportQueryProvider,
        TestGetZipQueryProvider,
        TestFindOneQueryProvider,
        TestFindOneByExternalKeyQueryProvider,
        TestFindManyQueryProvider,
        TestReportGetFileQueryProvider
    ]
})
export class MedicalModule { }