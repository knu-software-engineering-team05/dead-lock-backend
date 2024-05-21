import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export const SwaggerConfig = new DocumentBuilder()
  .setTitle('DEAD-LOCK 뇌졸중 발병 예측 서비스')
  .setDescription('소프트웨어 공학 TEAM5')
  .setVersion('1.0.0')
  .build();
