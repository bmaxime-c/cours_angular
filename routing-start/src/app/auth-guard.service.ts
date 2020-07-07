import { ActivatedRouteSnapshot, RouterStateSnapshot, Router, CanActivateChild } from "@angular/router";
import { Observable } from "rxjs";
import { Injectable } from "@angular/core";
import { AuthService } from "./auth.service";

@Injectable()
export class AuthGuardService implements CanActivateChild {
    constructor(private authService: AuthService, private router:Router) { }

    canActivateChild(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
            return this.authService.isAuthenticated().then((authenticated:boolean) => {
                if(authenticated) {
                    return true;
                } else {
                    this.router.navigate(['/']);
                    
                }
            });
    }

}