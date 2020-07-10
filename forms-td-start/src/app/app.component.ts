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
    console.log("Form submitted");
    console.log(this.signupForm);
  }
}
