import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { catchError, tap } from "rxjs/operators";
import { throwError, BehaviorSubject } from "rxjs";
import { User } from "./user.model";
import { Router } from "@angular/router";

export interface AuthResponseData {
    kind: string;
    idToken: string;
    email: string;
    refreshToken: string;
    localId: string;
    registered?: boolean;
    expiresIn?: number;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
    user = new BehaviorSubject<User>(null);

    private API_KEY = 'AIzaSyC7UA_-JZZL-En41OyC8WLV8no3vZ2J3vY';
    private _tokenExpirationTimer;

    constructor(private http: HttpClient, private router: Router) { }

    signup(email: string, password: string) {
        return this.http.post<AuthResponseData>("https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=" + this.API_KEY, {
            email: email,
            password: password,
            returnSecureToken: true
        }).pipe(catchError(errorRes => {
            return this.handleError(errorRes);
        }), tap(responseData => {
            this.handleAuthentication(
                responseData.email,
                responseData.localId,
                responseData.idToken,
                responseData.expiresIn
            );
        }));
    }

    autologin() {
        const userData: {
            email: string;
            id: string;
            _token: string;
            _tokenExpirationDate: string;
        } = JSON.parse(localStorage.getItem('userData'));
        if (!userData) {
            return;
        }

        const loadedUser = new User(userData.email, userData.id, userData._token, new Date(userData._tokenExpirationDate));

        if (loadedUser.token) {
            this.user.next(loadedUser);
            this.autoLogout(loadedUser.expiresIn);
        }
    }

    login(email: string, password: string) {

        return this.http.post<AuthResponseData>("https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=" + this.API_KEY, {
            email: email,
            password: password,
            returnSecureToken: true
        }).pipe(catchError(errorRes => {
            return this.handleError(errorRes);
        }), tap(responseData => {
            this.handleAuthentication(
                responseData.email,
                responseData.localId,
                responseData.idToken,
                responseData.expiresIn
            );
        }));
    }

    autoLogout(expirationDuration: number) {
        if(this._tokenExpirationTimer) {
            clearTimeout(this._tokenExpirationTimer);
        }
        
        this._tokenExpirationTimer = setTimeout(() => {
            this.logout();
        }, expirationDuration);
    }

    logout() {
        this.user.next(null);
        localStorage.removeItem('userData');

        if (this._tokenExpirationTimer) {
            clearTimeout(this._tokenExpirationTimer);
        }
        this._tokenExpirationTimer = null;

        this.router.navigate(['/auth']);
    }

    private handleAuthentication(email: string, userId: string, token: string, expiresIn: number) {
        const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
        const user = new User(email, userId, token, expirationDate);
        this.user.next(user);
        this.autoLogout(expiresIn);
        localStorage.setItem('userData', JSON.stringify(user));
    }

    private handleError(errorRes: HttpErrorResponse) {
        let errorMessage = 'An unknown error occurred!';

        if (!errorRes?.error?.error?.message) {
            return throwError(errorMessage);
        }

        switch (errorRes.error.error.message) {
            case 'EMAIL_EXISTS':
                errorMessage = "Cette adresse email existe déjà.";
                break;

            case 'INVALID_PASSWORD':
                errorMessage = "Adresse e-mail ou mot de passe invalide.";
                break;

            case 'EMAIL_NOT_FOUND':
                errorMessage = "Adresse e-mail ou mot de passe invalide.";
                break;

            case 'USER_DISABLED':
                errorMessage = "Cet utilisateur a été désactivé.";
                break;
        }

        return throwError(errorMessage);
    }
}