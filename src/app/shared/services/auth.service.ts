import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, catchError, tap, throwError } from "rxjs";
import { User } from "../user.model";
import { Router } from "@angular/router";
import { environment } from "src/environments/environment";


interface AuthResponse {
  kind: string;
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private signUpUrl = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${environment.API_KEY}`;
  private signInUrl = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.API_KEY}`;
  user = new BehaviorSubject<User>(null)

  constructor(private httpClient: HttpClient) {

  }


  signup(email: string, password: string) {
    return this.httpClient.post<AuthResponse>(this.signUpUrl, { email, password, returnSecureToken: true }).pipe(catchError((errorResponse) => {
      let errMsg = "An unknown error occured";
      if (!errorResponse.error.error || !errorResponse.error) {
        return throwError(() => errMsg);
      };
      switch (errorResponse.error.error.message) {
        case "EMAIL_EXISTS":
          errMsg = "This email exists already";
          return throwError(() => errMsg);

        default:
          return throwError(() => errMsg);

      }
    }),tap((data) => {
      this.handleAuth(data.email,data.localId,data.idToken,+data.expiresIn);
    }));
  }

  login(email: string, password: string) {
    return this.httpClient.post<AuthResponse>(this.signInUrl, { email, password, returnSecureToken: true }).pipe(catchError((errorResponse) => {
      let errMsg = "An unknown error occured";
      if (!errorResponse.error.error || !errorResponse.error) {
        return throwError(() => errMsg);
      }

    }))


  }

  private handleAuth(email:string,userId:string,token:string,expiresIn:number){
    const expirationDate = new Date(new Date().getTime() + expiresIn);
    const user = new User(email,userId,token,expirationDate);
    this.user.next(user);
  }
}