import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { Global, Module } from '@nestjs/common';
import { MailService } from './mail.service';
import { join } from 'path';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MailController } from './mail.controller';

@Global()
@Module({
  imports: [
    MailerModule.forRootAsync({

      useFactory: async (config: ConfigService) => ({

        transport: {
          host: 'send.one.com',
          port: 587,
          auth: {
            user: 'noreply@brixtonbest.se',
            pass: '123456brix',
          },
        },
        defaults: {
          from: `"No Reply noreply@brixtonbest.se" `,
        },
        template: {
          dir: join(__dirname, 'templates'),
          adapter: new HandlebarsAdapter(),
          options: {
            strict: true,
          },
        },
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [MailService],
  exports: [MailService],
  controllers: [MailController],
})
export class MailModule { }
