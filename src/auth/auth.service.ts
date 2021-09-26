
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import Stripe from 'stripe';

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService,
    ) {
    }

    user: any;


    async stripe(token, amount, description) {

        console.log(token);


        const stripe = new Stripe('sk_test_gSL1WLbKaAblYlHv12oBdsxM00eBmhIBfx', {
            apiVersion: '2020-08-27',
        });



        stripe.charges.create({
            amount: amount,
            currency: 'SEK',
            description: description,
            source: token
        }).then((check) => {


            return check.paid;


        }).catch((err => {

            return err;
        }))

        return;
    }

    async validateUser(LoginUserDto): Promise<any> {

        const user = await this.usersService.searchByEmail(LoginUserDto.email.toLowerCase());

        this.user = user.toString()






        if (this.user.includes('no record exists!!!')) {
            console.log('no user found');
            return 'No records associated with this email'
        }
        else if (!this.user.includes('no record exists')) {
            const userObj = user.find(item => item.email === LoginUserDto.email);
            // Here you can access object which you want

            const password = userObj.password;



            const isMatch = await this.checkPassword(LoginUserDto.password, password);

            console.log(isMatch);

            if (isMatch == true) {
                console.log('tada we got user', userObj._id);

                const payload = { sub: userObj._id };
                const token = this.jwtService.sign(payload)
                return token;
            } else {
                return 'Password entered is wrong!!!';

            }


        }



    }

    checkPassword(textEnteredInLoginForm, hashedPasswordFromDatabase) {
        return new Promise(function (resolve, reject) {
            bcrypt.compare(textEnteredInLoginForm, hashedPasswordFromDatabase, function (err, doesMatch) {
                if (err) {
                    reject(err);
                }
                console.log(doesMatch);
                resolve(doesMatch);
            });
        });
    };



}