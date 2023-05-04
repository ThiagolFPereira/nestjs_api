import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'

export function setupSwagger(app: any) {
  const options = new DocumentBuilder()
    .setTitle('My API')
    .setDescription('API description')
    .setVersion('1.0')
    .addTag('doc')
    .build()
  const document = SwaggerModule.createDocument(app, options)
  SwaggerModule.setup('doc', app, document)
}
