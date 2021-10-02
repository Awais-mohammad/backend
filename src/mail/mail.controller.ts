import { MailService } from './mail.service';

import { Controller, Post, Body, Get } from '@nestjs/common';

@Controller('mail')
export class MailController {

    constructor(private readonly MailerService: MailService) { }
    @Post()
    create(@Body() data: any) {
        return this.MailerService.sendUserConfirmation(data)
    }

    @Post('c_order')
    async pay(@Body() data: any) {



        return await this.MailerService.orderGot(data)

    }

    @Get()
    fine() {
        return 'working fine babes!!'
    }
}
