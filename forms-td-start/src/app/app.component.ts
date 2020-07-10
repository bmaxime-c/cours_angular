import { Component, ViewChild } from '@angular/core';
import { NgForm, NgModelGroup } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  @ViewChild('f', {static: true}) signupForm: NgForm;
  answer;
  genders = ['male', 'female'];
  user = {
    username:"",
    email: "",
    secretQuestion: "",
    answer: "",
    gender: ""
  }
  submitted:boolean = false;
  
  suggestUserName() {
    const suggestedName = 'Superuser';
    // this.signupForm.setValue({
    //   userData: {
    //     username: suggestedName,
    //     email: ""
    //   },
    //   questionAnswer: "The answer",
    //   secret: 'pet',
    //   gender:"female"
    // });

    this.signupForm.form.patchValue({
      userData: {
        username: suggestedName,
        email: suggestedName+"@example.com"
      }
    });
  }

  onSubmit() {
    this.user.username = this.signupForm.value.userData.username;
    this.user.email = this.signupForm.value.userData.email;
    this.user.secretQuestion = this.signupForm.value.secret;
    this.user.answer = this.signupForm.value.questionAnswer;
    this.user.gender = this.signupForm.value.gender;
    this.submitted = true;
    this.signupForm.reset();
  }
}
