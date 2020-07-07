import { EventEmitter } from "@angular/core";

export class AuthService {
    loggedIn = false;

    loggedInChanged = new EventEmitter<boolean>();

    isAuthenticated(): Promise<unknown> {
        const promise = new Promise(
            (resolve,reject) => {
                setTimeout(() => {
                    resolve(this.loggedIn);
                }, 800);
            }
        );

        return promise;
    }

    login() {
        this.loggedIn = true;
        console.log("LOGIN");
        this.loggedInChanged.emit(this.loggedIn);
    }

    logout() {
        this.loggedIn = false;
        console.log("LOGOUT");
        this.loggedInChanged.emit(this.loggedIn);
    }
}