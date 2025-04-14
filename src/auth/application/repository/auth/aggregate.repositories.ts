import { Auth, AuthProps } from "@omega/auth/core/domain/auth/auth.domain";
import { AggregateRepository } from "@shared/shared/providers";

export type AuthRepository = AggregateRepository<AuthProps, Auth>;