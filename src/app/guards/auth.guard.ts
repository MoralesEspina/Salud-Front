import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

import { UserService } from '../services/user.service';

@Injectable({
    providedIn: 'root'
})

export class AuthGuard implements CanActivate {
    constructor(private router: Router, private authUser: UserService) {
    }

    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot) {
        const user = this.authUser.userValue;

        if (user) {
            if (route.data.roles && route.data.roles.indexOf(user.rol) === -1) {
                this.router.navigate(['/'])
                return false;
            }
            return true;
        }

        this.router.navigate(['/login'], { queryParams: { returnURL: state } })
        return false;

    }
}

