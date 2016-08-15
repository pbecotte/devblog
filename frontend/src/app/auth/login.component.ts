import {Component}   from '@angular/core';
import {Router}      from '@angular/router';
import {AuthService} from './auth.service';


@Component({
    templateUrl: 'app/auth/login.component.html'
})
export class LoginComponent {
    constructor(public authService: AuthService, public router: Router) {
    }

    username: string = '';
    password: string = '';

    login() {
        this.authService.login(this.username, this.password)
    }

    logout() {
        this.authService.logout();
    }
}
