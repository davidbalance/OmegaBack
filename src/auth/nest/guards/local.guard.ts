import { Injectable } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { LocalStrategyToken } from "../strategy/local.strategy";

@Injectable()
export class LocalGuard extends AuthGuard(LocalStrategyToken) { }