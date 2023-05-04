"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setupSwagger = void 0;
const swagger_1 = require("@nestjs/swagger");
function setupSwagger(app) {
    const options = new swagger_1.DocumentBuilder()
        .setTitle('My API')
        .setDescription('API description')
        .setVersion('1.0')
        .addTag('doc')
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, options);
    swagger_1.SwaggerModule.setup('doc', app, document);
}
exports.setupSwagger = setupSwagger;
//# sourceMappingURL=swagger.js.map