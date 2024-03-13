import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import Joi from 'joi';

@Module({
    imports: [
        ConfigModule.forRoot({
            validationSchema: Joi.object({
                "jwt.default.secret": Joi.string().required(),
                "jwt.default.expiresIn": Joi.string().required(),
                "jwt.refresh.secret": Joi.string().required(),
                "jwt.refresh.expiresIn": Joi.string().required()
            }),
            cache: true,
            isGlobal: true
        }),
        JwtModule.registerAsync({
            inject: [ConfigService],
            useFactory: async (config: ConfigService) => ({
                secret: config.get<string>("jwt.access.secret"),
                signOptions: {
                    expiresIn: config.get<string>("jwt.access.expiresIn")
                }
            })
        })
    ],
    providers: []
})
export class WebTokenModule { }
