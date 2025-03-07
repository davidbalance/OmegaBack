import { DoctorOptionModel } from "@omega/profile/core/model/user/doctor-option.model";
import { DoctorModel } from "@omega/profile/core/model/user/doctor.model";
import { UserAttributeModel } from "@omega/profile/core/model/user/user-attribute.model";
import { UserModel } from "@omega/profile/core/model/user/user.model";
import { CountRepository, ModelRepository } from "@shared/shared/providers";

export type DoctorOptionRepository = ModelRepository<DoctorOptionModel>;
export type DoctorRepository = ModelRepository<DoctorModel> & CountRepository<DoctorModel>;
export type UserAttributeRepository = ModelRepository<UserAttributeModel>;
export type UserRepository = ModelRepository<UserModel> & CountRepository<UserModel>;
