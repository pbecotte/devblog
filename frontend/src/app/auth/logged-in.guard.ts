import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {AuthService} from "./auth.service";

@Injectable()
export class LoggedInGuard implements CanActivate {
    constructor(private auth: AuthService, private router: Router) {
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        if (this.auth.isLoggedIn) {
            return true;
        }

        this.auth.redirectUrl = state.url;
        this.router.navigate(['angular/login']);
        return false;
    }
}
