import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  isLoginMode = true;
  isLoading = false;
  error: string = null;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
  }

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit(form: NgForm) {
    if (!form.valid) {
      return;
    }

    this.isLoading = true;
    if (this.isLoginMode) {
      this.isLoading = false;
    } else {

      const email = form.value.email;
      const password = form.value.password;
      this.authService.signup(email, password).subscribe(
        resData => {
          console.log(resData);
          this.isLoading = false;
        },
        errorMessage => {
          console.error(errorMessage);
          this.error = errorMessage;
          this.isLoading = false;
        });
      form.resetForm();
    }
  }
}
