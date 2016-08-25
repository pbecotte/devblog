import {Injectable} from '@angular/core';


import {Http, Headers} from "@angular/http";
import {MessageService} from "../messages/messages.service";
import {Router} from "@angular/router";


@Injectable()
export class AuthService {
    public isLoggedIn: boolean = false;
    public redirectUrl: string;

    constructor(private http: Http,
                private messageService: MessageService,
                private router: Router) {
        this.isLoggedIn = !!localStorage.getItem('auth_token');
    }

    admin() {
        var admin = localStorage.getItem('admin');
        if (!this.isLoggedIn || admin == undefined){ return false; }
        return admin === 'true';
    }

    login(username: string, password: string) {
        this.http.post('api/login', {email: username, password: password})
            .subscribe(
                response => {
                    var r = response.json().response.user;
                    localStorage.setItem('auth_token', r.authentication_token);
                    localStorage.setItem('admin', r.admin);
                    this.isLoggedIn = true;

                    if (this.redirectUrl) {
                        this.router.navigate([this.redirectUrl])
                    }
                    else {
                        this.router.navigate([''])
                    }
                },
                error => this.messageService.addMessage('Login Failed!'));
    }

    logout() {
        this.http.get('api/logout')
            .subscribe(
                response => {
                    localStorage.removeItem('auth_token');
                    this.isLoggedIn = false;
                    this.router.navigate(['']);
                },
                error => {
                    console.log(error);
                    this.messageService.addMessage('Failed to logout...');
                });
    }

    signup(alias: string, username: string, password: string) {
        this.http.post('api/register', {
            alias: alias,
            email: username,
            password: password,
            password_confirm: password
        })
            .subscribe(
                response => {
                    var code = response.json().meta.code;
                    if (code === 200) {
                        var r = response.json().response.user;
                        localStorage.setItem('auth_token', r.authentication_token);
                        localStorage.setItem('admin', r.admin);
                        this.isLoggedIn = true;
                        this.router.navigate([''])
                    } else {
                        var errors = response.json().response.errors;
                        if (errors.email) {
                            this.messageService.addMessage(errors.email);
                        }
                        if (errors.password) {
                            this.messageService.addMessage(errors.password);
                        }
                    }
                },
                error => {
                    console.log(error);
                    this.messageService.addMessage('Failed to sign up...');
                }
            );
    }

    head() {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        let authToken = localStorage.getItem('auth_token');
        headers.append('Authorization', `JWT ${authToken}`);

        return {headers}
    }

    get(url) {
        return this.http.get(url, this.head())
    }

    post(url, body) {
        return this.http.post(url, body, this.head())
    }
}
