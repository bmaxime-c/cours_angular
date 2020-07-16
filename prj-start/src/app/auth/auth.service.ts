import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { catchError } from "rxjs/operators";
import { throwError } from "rxjs";

export interface AuthResponseData {
    kind: string;
    idToken: string;
    email: string;
    refreshToken: string;
    localId: string;
    registered?: boolean;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
    private API_KEY = 'AIzaSyC7UA_-JZZL-En41OyC8WLV8no3vZ2J3vY';

    constructor(private http: HttpClient) { }

    signup(email: string, password: string) {
        return this.http.post<AuthResponseData>("https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=" + this.API_KEY, {
            email: email,
            password: password,
            returnSecureToken: true
        }).pipe(catchError(errorRes => {
            return this.handleError(errorRes);
        }));
    }

    login(email: string, password: string) {

        return this.http.post<AuthResponseData>("https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=" + this.API_KEY, {
            email: email,
            password: password,
            returnSecureToken: true
        }).pipe(catchError(errorRes => {
            return this.handleError(errorRes);
        }));
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