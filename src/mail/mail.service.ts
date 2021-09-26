import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class MailService {

    constructor(private mailerService: MailerService) { }

    async sendUserConfirmation(data: any) {
        console.log(data, 'data check!!');

        const token = Math.floor(1000 + Math.random() * 9000).toString();
        const url = 'dbfoisfidbsdbfusdfbkjsdfbisdfbiusd';

        await this.mailerService.sendMail({
            to: data.email,
            // from: '"Support Team" <support@example.com>', // override default from
            subject: 'hello ashfaqaa g kyaa chal rha hai ajkal!!!',
            template: './' + data.template, // `.hbs` extension is appended automatically
            context: { // ✏️ filling curly brackets with content
                name: data.name,
                url,
            },
        }).then(() => {
            return 'email sent successfully!!!'
        });
    }

}
