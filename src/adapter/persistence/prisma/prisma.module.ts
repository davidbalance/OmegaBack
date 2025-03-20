import { Global, Module } from "@nestjs/common";
import { PrismaService } from "./prisma.service";
import { AuthAggregateRepositoryToken, LogoAggregateRepositoryToken, ResourceAggregateRepositoryToken } from "@omega/auth/nest/inject/aggregate-repository.inject";
import { ApiKeyValueModelRepositoryToken, ApiKeyModelRepositoryToken, AuthResourceModelRepositoryToken, AuthModelRepositoryToken, LogoModelRepositoryToken, ResourceModelRepositoryToken, TokenModelRepositoryToken } from "@omega/auth/nest/inject/model-repository.inject";
import { AuthAggregateRepositoryProvider } from "./repository/auth/domain/auth.prisma-respository";
import { LogoAggregateRepositoryProvider } from "./repository/auth/domain/logo.prisma-respository";
import { ResourceAggregateRepositoryProvider } from "./repository/auth/domain/resource.prisma-respository";
import { ApiKeyModelRepositoryProvider } from "./repository/auth/model/api_key.prisma-respository";
import { ApiKeyValueModelRepositoryProvider } from "./repository/auth/model/api_key_value.prisma-respository";
import { AuthModelRepositoryProvider } from "./repository/auth/model/auth.prisma-respository";
import { AuthResourceModelRepositoryProvider } from "./repository/auth/model/auth_resource.prisma-respository";
import { LogoModelRepositoryProvider } from "./repository/auth/model/logo.prisma-respository";
import { ResourceModelRepositoryProvider } from "./repository/auth/model/resource.prisma-respository";
import { TokenModelRepositoryProvider } from "./repository/auth/model/token.prisma-respository";
import { DiseaseGroupAggregateRepositoryToken } from "@omega/disease/nest/inject/aggregate-repository.inject";
import { DiseaseGroupOptionModelRepositoryToken, DiseaseGroupModelRepositoryToken, DiseaseModelRepositoryToken } from "@omega/disease/nest/inject/model-repository.inject";
import { DiseaseGroupAggregateRepositoryProvider } from "./repository/disease/domain/disease-group.prisma-repository";
import { DiseaseGroupOptionModelRepositoryProvider } from "./repository/disease/model/disease-group-option.prisma-repository";
import { DiseaseGroupModelRepositoryProvider } from "./repository/disease/model/disease-group.prisma-repository";
import { DiseaseModelRepositoryProvider } from "./repository/disease/model/disease.prisma-repository";
import { ExamTypeAggregateRepositoryToken } from "@omega/laboratory/nest/inject/aggregate-repository.inject";
import { ExamSubtypeOptionModelRepositoryToken, ExamSubtypeModelRepositoryToken, ExamTypeOptionModelRepositoryToken, ExamTypeModelRepositoryToken, ExamModelRepositoryToken } from "@omega/laboratory/nest/inject/model-repository.inject";
import { ExamTypeAggregateRepositoryProvider } from "./repository/laboratory/domain/exam-type.prisma-repository";
import { ExamSubtypeOptionModelRepositoryProvider } from "./repository/laboratory/model/exam-subtype-option.prisma-repository";
import { ExamSubtypeModelRepositoryProvider } from "./repository/laboratory/model/exam-subtype.prisma-repository";
import { ExamTypeOptionModelRepositoryProvider } from "./repository/laboratory/model/exam-type-option.prisma-repository";
import { ExamTypeModelRepositoryProvider } from "./repository/laboratory/model/exam-type.prisma-repository";
import { ExamModelRepositoryProvider } from "./repository/laboratory/model/exam.prisma-repository";
import { AreaAggregateRepositoryToken, CorporativeAggregateRepositoryToken, JobPositionAggregateRepositoryToken, ManagementAggregateRepositoryToken } from "@omega/location/nest/inject/aggregate-repository.inject";
import { AreaOptionModelRepositoryToken, AreaModelRepositoryToken, BranchModelRepositoryToken, CompanyOptionModelRepositoryToken, CompanyModelRepositoryToken, CorporativeOptionModelRepositoryToken, CorporativeModelRepositoryToken, JobPositionOptionModelRepositoryToken, JobPositionModelRepositoryToken, ManagementOptionModelRepositoryToken, ManagementModelRepositoryToken } from "@omega/location/nest/inject/model-repository.inject";
import { AreaAggregateRepositoryProvider } from "./repository/location/domain/area.prisma-repository";
import { CorporativeAggregateRepositoryProvider } from "./repository/location/domain/corporative.prisma-repository";
import { JobPositionAggregateRepositoryProvider } from "./repository/location/domain/job-position.prisma-repository";
import { ManagementAggregateRepositoryProvider } from "./repository/location/domain/management.prisma-repository";
import { AreaOptionModelRepositoryProvider } from "./repository/location/model/area-option.prisma-repository";
import { AreaModelRepositoryProvider } from "./repository/location/model/area.prisma-repository";
import { BranchModelRepositoryProvider } from "./repository/location/model/branch.prisma-repository";
import { CompanyOptionModelRepositoryProvider } from "./repository/location/model/company-option.prisma-repository";
import { CompanyModelRepositoryProvider } from "./repository/location/model/company.prisma-repository";
import { CorporativeOptionModelRepositoryProvider } from "./repository/location/model/corporative-option.prisma-repository";
import { CorporativeModelRepositoryProvider } from "./repository/location/model/corporative.prisma-repository";
import { JobPositionOptionModelRepositoryProvider } from "./repository/location/model/job-position-option.prisma-repository";
import { JobPositionModelRepositoryProvider } from "./repository/location/model/job-position.prisma-repository";
import { ManagementOptionModelRepositoryProvider } from "./repository/location/model/management-option.prisma-repository";
import { ManagementModelRepositoryProvider } from "./repository/location/model/management.prisma-repository";
import { ClientAggregateRepositoryToken, OrderAggregateRepositoryToken, TestAggregateRepositoryToken } from "@omega/medical/nest/inject/aggregate-repository.inject";
import { ClientAreaModelRepositoryToken, ClientDoctorModelRepositoryToken, ClientEmailModelRepositoryToken, ClientJobPositionModelRepositoryToken, ClientManagementModelRepositoryToken, ClientModelRepositoryToken, OrderChecklistModelRepositoryToken, OrderCloudFileModelRepositoryToken, OrderPatientModelRepositoryToken, OrderProcessModelRepositoryToken, OrderYearModelRepositoryToken, OrderModelRepositoryToken, DiseaseReportModelRepositoryToken, ReportModelRepositoryToken, ResultFilepathModelRepositoryToken, TestReportModelRepositoryToken, TestModelRepositoryToken, OrderDoctorModelRepositoryToken, TestFileResultRepositoryToken, ClientRecordModelRepositoryToken, TestInnerModelRepositoryToken } from "@omega/medical/nest/inject/model-repository.inject";
import { ClientAggregateRepositoryProvider } from "./repository/medical/domain/client.prisma-repository";
import { OrderAggregateRepositoryProvider } from "./repository/medical/domain/order.prisma-repository";
import { TestAggregateRepositoryProvider } from "./repository/medical/domain/test.prisma-repository";
import { ClientAreaModelRepositoryProvider } from "./repository/medical/model/client-area.prisma-repository";
import { ClientEmailModelRepositoryProvider } from "./repository/medical/model/client-email.prisma-repository";
import { ClientJobPositionModelRepositoryProvider } from "./repository/medical/model/client-job.position.prisma-repository";
import { ClientManagementModelRepositoryProvider } from "./repository/medical/model/client-management.prisma-repository";
import { ClientModelRepositoryProvider } from "./repository/medical/model/client.prisma-repository";
import { OrderChecklistModelRepositoryProvider } from "./repository/medical/model/order-checklist.prisma-repository";
import { OrderCloudFileModelRepositoryProvider } from "./repository/medical/model/order-cloud-file.prisma-repository";
import { OrderPatientModelRepositoryProvider } from "./repository/medical/model/order-patient.prisma-repository";
import { OrderProcessModelRepositoryProvider } from "./repository/medical/model/order-process.prisma-repository";
import { OrderYearModelRepositoryProvider } from "./repository/medical/model/order-year.prisma-repository";
import { OrderModelRepositoryProvider } from "./repository/medical/model/order.prisma-repository";
import { UserAggregateRepositoryToken } from "@omega/profile/nest/inject/aggregate-repository.inject";
import { DoctorOptionModelRepositoryToken, DoctorModelRepositoryToken, UserAttributeModelRepositoryToken, UserModelRepositoryToken } from "@omega/profile/nest/inject/model-repository.inject";
import { UserAggregateRepositoryProvider } from "./repository/profile/domain/user.prisma-repository";
import { DoctorOptionModelRepositoryProvider } from "./repository/profile/model/doctor-option.prisma-repository";
import { DoctorModelRepositoryProvider } from "./repository/profile/model/doctor.prisma-repository";
import { UserAttributeModelRepositoryProvider } from "./repository/profile/model/user-attribute.prisma-repository";
import { UserModelRepositoryProvider } from "./repository/profile/model/user.prisma-repository";
import { DiseaseReportModelRepositoryProvider } from "./repository/medical/model/disease-report.prisma-repository";
import { ReportModelRepositoryProvider } from "./repository/medical/model/report.prisma-repository";
import { ResultFilepathModelRepositoryProvider } from "./repository/medical/model/result-filepath.prisma-repository";
import { TestReportModelRepositoryProvider } from "./repository/medical/model/test-report.prisma-repository";
import { TestModelRepositoryProvider } from "./repository/medical/model/test.prisma-repository";
import { OrderDoctorModelRepositoryProvider } from "./repository/medical/model/order-doctor.prisma-repository";
import { LoggerRepositoryProvider } from "./repository/logger/domain/logger.prisma-repository";
import { LoggerRepositoryToken } from "@db-logger/db-logger/nest/inject/repository.inject";
import { ClientDoctorModelRepositoryProvider } from "./repository/medical/model/client_doctor.prisma-repository";
import { TestFileResultRepositoryProvider } from "./repository/medical/model/test_file_result.prisma_repository";
import { ClientRecordModelRepositoryProvider } from "./repository/medical/model/client-record.prisma-repository";
import { IncrementDomainRepositoryProvider } from "./repository/increment/increment.prisma-repository";
import { IncrementRepositoryToken } from "@local-increment/local-increment/repository/increment.repository";
import { TestInnerModelRepositoryProvider } from "./repository/medical/model/test-inner.prisma-repository";

@Global()
@Module({
    providers: [
        PrismaService,
        AuthAggregateRepositoryProvider,
        LogoAggregateRepositoryProvider,
        ResourceAggregateRepositoryProvider,
        ApiKeyValueModelRepositoryProvider,
        ApiKeyModelRepositoryProvider,
        AuthResourceModelRepositoryProvider,
        AuthModelRepositoryProvider,
        LogoModelRepositoryProvider,
        ResourceModelRepositoryProvider,
        TokenModelRepositoryProvider,
        DiseaseGroupAggregateRepositoryProvider,
        DiseaseGroupOptionModelRepositoryProvider,
        DiseaseGroupModelRepositoryProvider,
        DiseaseModelRepositoryProvider,
        ExamTypeAggregateRepositoryProvider,
        ExamSubtypeOptionModelRepositoryProvider,
        ExamSubtypeModelRepositoryProvider,
        ExamTypeOptionModelRepositoryProvider,
        ExamTypeModelRepositoryProvider,
        ExamModelRepositoryProvider,
        AreaAggregateRepositoryProvider,
        CorporativeAggregateRepositoryProvider,
        JobPositionAggregateRepositoryProvider,
        ManagementAggregateRepositoryProvider,
        AreaOptionModelRepositoryProvider,
        AreaModelRepositoryProvider,
        BranchModelRepositoryProvider,
        CompanyOptionModelRepositoryProvider,
        CompanyModelRepositoryProvider,
        CorporativeOptionModelRepositoryProvider,
        CorporativeModelRepositoryProvider,
        JobPositionOptionModelRepositoryProvider,
        JobPositionModelRepositoryProvider,
        ManagementOptionModelRepositoryProvider,
        ManagementModelRepositoryProvider,
        LoggerRepositoryProvider,
        ClientAggregateRepositoryProvider,
        OrderAggregateRepositoryProvider,
        TestAggregateRepositoryProvider,
        ClientDoctorModelRepositoryProvider,
        ClientAreaModelRepositoryProvider,
        ClientEmailModelRepositoryProvider,
        ClientJobPositionModelRepositoryProvider,
        ClientManagementModelRepositoryProvider,
        ClientRecordModelRepositoryProvider,
        ClientModelRepositoryProvider,
        DiseaseReportModelRepositoryProvider,
        OrderChecklistModelRepositoryProvider,
        OrderCloudFileModelRepositoryProvider,
        OrderDoctorModelRepositoryProvider,
        OrderPatientModelRepositoryProvider,
        OrderProcessModelRepositoryProvider,
        OrderYearModelRepositoryProvider,
        OrderModelRepositoryProvider,
        UserAggregateRepositoryProvider,
        DoctorOptionModelRepositoryProvider,
        DoctorModelRepositoryProvider,
        UserAttributeModelRepositoryProvider,
        UserModelRepositoryProvider,
        ReportModelRepositoryProvider,
        ResultFilepathModelRepositoryProvider,
        TestFileResultRepositoryProvider,
        TestInnerModelRepositoryProvider,
        TestReportModelRepositoryProvider,
        TestModelRepositoryProvider,
        IncrementDomainRepositoryProvider
    ],
    exports: [
        AuthAggregateRepositoryToken,
        LogoAggregateRepositoryToken,
        ResourceAggregateRepositoryToken,
        ApiKeyValueModelRepositoryToken,
        ApiKeyModelRepositoryToken,
        AuthResourceModelRepositoryToken,
        AuthModelRepositoryToken,
        LogoModelRepositoryToken,
        ResourceModelRepositoryToken,
        TokenModelRepositoryToken,
        DiseaseGroupAggregateRepositoryToken,
        DiseaseGroupOptionModelRepositoryToken,
        DiseaseGroupModelRepositoryToken,
        DiseaseModelRepositoryToken,
        ExamTypeAggregateRepositoryToken,
        ExamSubtypeOptionModelRepositoryToken,
        ExamSubtypeModelRepositoryToken,
        ExamTypeOptionModelRepositoryToken,
        ExamTypeModelRepositoryToken,
        ExamModelRepositoryToken,
        AreaAggregateRepositoryToken,
        CorporativeAggregateRepositoryToken,
        JobPositionAggregateRepositoryToken,
        ManagementAggregateRepositoryToken,
        AreaOptionModelRepositoryToken,
        AreaModelRepositoryToken,
        BranchModelRepositoryToken,
        CompanyOptionModelRepositoryToken,
        CompanyModelRepositoryToken,
        CorporativeOptionModelRepositoryToken,
        CorporativeModelRepositoryToken,
        JobPositionOptionModelRepositoryToken,
        JobPositionModelRepositoryToken,
        ManagementOptionModelRepositoryToken,
        ManagementModelRepositoryToken,
        LoggerRepositoryToken,
        ClientAggregateRepositoryToken,
        OrderAggregateRepositoryToken,
        TestAggregateRepositoryToken,
        ClientDoctorModelRepositoryToken,
        ClientAreaModelRepositoryToken,
        ClientEmailModelRepositoryToken,
        ClientJobPositionModelRepositoryToken,
        ClientManagementModelRepositoryToken,
        ClientRecordModelRepositoryToken,
        ClientModelRepositoryToken,
        DiseaseReportModelRepositoryToken,
        OrderChecklistModelRepositoryToken,
        OrderCloudFileModelRepositoryToken,
        OrderDoctorModelRepositoryToken,
        OrderPatientModelRepositoryToken,
        OrderProcessModelRepositoryToken,
        OrderYearModelRepositoryToken,
        OrderModelRepositoryToken,
        UserAggregateRepositoryToken,
        DoctorOptionModelRepositoryToken,
        DoctorModelRepositoryToken,
        UserAttributeModelRepositoryToken,
        UserModelRepositoryToken,
        ReportModelRepositoryToken,
        ResultFilepathModelRepositoryToken,
        TestFileResultRepositoryToken,
        TestInnerModelRepositoryToken,
        TestReportModelRepositoryToken,
        TestModelRepositoryToken,
        IncrementRepositoryToken
    ]
})
export class PrismaModule { }