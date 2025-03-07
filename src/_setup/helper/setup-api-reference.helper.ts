import { INestApplication } from "@nestjs/common";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { apiReference } from "@scalar/nestjs-api-reference";

export function setupApiReference<T>(app: INestApplication<T>) {
    const config = new DocumentBuilder()
        .setTitle("Omega Report API")
        .setVersion("1.0")
        .addTag("Omega")
        .addBearerAuth(
            { type: 'apiKey', scheme: 'bearer', bearerFormat: 'JWT' },
            'bearer',
        )
        .build();

    const document = SwaggerModule.createDocument(app, config);

    SwaggerModule.setup('api', app, document, {
        swaggerUiEnabled: false,
    });

    app.use('/reference', apiReference({
        spec: {
            content: document
        },
        defaultHttpClient: {
            targetKey: 'node',
            clientKey: 'fetch',
        },
        authentication: {
            preferredSecurityScheme: 'bearer',
        }
    }));
}