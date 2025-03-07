import { Logo, LogoProps } from "@omega/auth/core/domain/logo/logo.domain";
import { AggregateRepository } from "@shared/shared/providers";

export type LogoRepository = AggregateRepository<LogoProps, Logo>;