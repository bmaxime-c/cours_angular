import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

interface AuthResponseData {
    kind: string;
    idToken: string;
    email: string;
    refreshToken: string;
    localId: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
    constructor(private http: HttpClient) { }

    signup(email: string, password: string) {
        return this.http.post<AuthResponseData>("https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyC7UA_-JZZL-En41OyC8WLV8no3vZ2J3vY", {
            email: email,
            password: password,
            returnSecureToken: true
        });
    }
}