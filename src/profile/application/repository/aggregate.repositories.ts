import { User, UserProps } from "@omega/profile/core/domain/user/user.domain";
import { AggregateRepository } from "@shared/shared/providers";

export type UserRepository = AggregateRepository<UserProps, User>;