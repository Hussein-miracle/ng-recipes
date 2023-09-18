import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../shared/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  signupForm: NgForm;
  isLoginMode = !true;
  isLoading = false;
  error: string = "";
  isError: boolean = false;

  constructor(private authService: AuthService, private router: Router) {

  }

  ngOnInit(): void {

  }

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode
  }

  onSubmit(form: NgForm) {
    // console.log(form);
    if (!form.valid) return;
    this.isLoading = true;
    if (this.isLoginMode) {
      this.logIn(form.value)
    } else {
      this.signUp(form.value)
    }
    form.reset();
  }

  signUp(details: { email: string, password: string }) {
    this.isLoading = true;
    this.authService.signup(details.email, details.password).subscribe({
      next: (response) => {
        console.log({ response }, 'signup response');
        this.isLoading = false;
        this.router.navigate(["recipes"])
      },
      error: (errMessage) => {
        this.isError = true;
        console.error(errMessage);
        this.isLoading = false;
        this.error = errMessage;

        setTimeout(() => {
          this.isError = false;
        }, 3000)
      },
      complete: () => {
        this.isLoading = false;
        console.info('complete signup')
      }

    });
  }

  logIn(details: { email: string, password: string }) {
    this.authService.login(details.email, details.password).subscribe({
      next: (authResponse) => {
        console.log({ authResponse });
        this.isLoading = false;

        this.router.navigate(["recipes"])
      }, error: (errMessage) => {
        console.log(errMessage, 'login err');
        this.isError = true;
        console.error(errMessage);
        this.isLoading = false;
        this.error = errMessage;

        setTimeout(() => {
          this.isError = false;
        }, 3000)

      }, complete: () => { }
    })
  }

}
