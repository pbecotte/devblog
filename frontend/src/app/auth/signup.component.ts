import {Component}   from '@angular/core';
import {Router}      from '@angular/router';
import {AuthService} from './auth.service';
import {MessageService} from "../messages/messages.service";


@Component({
    templateUrl: 'app/auth/signup.component.html'
})
export class SignupComponent {
    constructor(public authService: AuthService,
                public router: Router,
                public messageService:MessageService) {
    }

    email: string = '';
    alias: string = '';
    password: string = '';
    confirmPassword: string = '';

    signup() {
        this.authService.signup(this.alias, this.email, this.password)
    }
}
