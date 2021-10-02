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
            subject: 'Your account have been created successfully!!',
            template: './' + data.template, // `.hbs` extension is appended automatically
            context: { // ✏️ filling curly brackets with content
                name: data.name,
            },
        }).then(() => {
            return 'email sent successfully!!!'
        });
    }

    async orderGot(data: any) {
        console.log(data, 'data check!!');
        const token = Math.floor(1000 + Math.random() * 9000).toString();
        const url = 'dbfoisfidbsdbfusdfbkjsdfbisdfbiusd';

        var results = data.products

        var content = results.reduce(function (a, b) {
            return a + '<tr><td>' + b.name + '</a></td><td>' + b.size + '</td><td>' + b.quantity + '</td><td>' + b.color + '</td></tr>';

        }, '');



        await this.mailerService.sendMail({
            to: data.email,
            // from: '"Support Team" <support@example.com>', // override default from
            subject: 'Your order have been confirmed!!',
            html: ' <p>Dear ' + data.name +
                ' your order has been confirmed.Your order id for this order is:8329742. You can use this order id for any sort of querries in future.</p> <br> <div style="display:flex;justify-content-center,align-items:center,text-align:center"> <table<div><table border="1" style="border-collapse:collapse;""><thead><tr><th style="padding:10px">Name</th><th style="padding:10px">Size</th><th style="padding:10px">Quantity</th><th style="padding:10px">color</th></tr></thead><tbody> '
                + content + '</tbody></table></div></div> <p>Your order summary: Total amount paid was: 100SEK</p><br> <br> <p>In case of any querry you can contact us by filling the contact form <a href="https://brixtonbest.se/contact">' +
                'contact</a>.Best of luck happy shopping .This mail box is unmonitored so donnot send your emails as they will be left uncheckd.For querries as mentioned above please contact at contact@brixtonbest.se. If in case you found a bug or any issue.Let us know.<br> <span style="color:red;">We keep our users data secure and thus donnot save your card details.you can find more at <a href="https://brixtonbest.se/privacy">Our policy</a></span><span style="color:tomato;text-align:center">Hoping to deliver you as soon as possible</span> <address> Best Regards, <br> Brixtonbest, </address> </p><p>Find out our newest products for this season <a href="https://brixtonbest.se/products">Explore</a></p></div><footer><p style="">You are recieving this email because you have created an account at brixtonbest.se.If it wasnot you you can let us know at contact@brixtonbest.se.</p></footer>', // html body

        }).then(() => {
            return 'email sent successfully!!!'
        }).catch((err => {
            return err
        }));

    }

    async recoverpass(email: string, code) {


        const token = Math.floor(1000 + Math.random() * 9000).toString();
        const url = 'dbfoisfidbsdbfusdfbkjsdfbisdfbiusd';

        await this.mailerService.sendMail({
            to: email,
            // from: '"Support Team" <support@example.com>', // override default from
            subject: 'OTP to reset password for brixtonbest!!',
            template: './' + 'confirmation', // `.hbs` extension is appended automatically
            context: { // ✏️ filling curly brackets with content

                code: code,
            },
        }).then(() => {
            return 'email sent successfully!!!'
        });
    }


}
