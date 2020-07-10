import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  genders = ['male', 'female'];
  signUpForm: FormGroup;
  forbiddenUsernames = ['Chris', 'Anna'];

  get controls() {
    return (this.signUpForm.get('hobbies') as FormArray).controls;
  }

  ngOnInit(): void {
    this.signUpForm = new FormGroup({
      'userData': new FormGroup({
        'username': new FormControl(null, [Validators.required, this.forbiddenNames.bind(this)]),
        'email': new FormControl(null, [Validators.required, Validators.email], this.forbiddenEmails.bind(this)),
      }),
      'gender': new FormControl('male'),
      'hobbies': new FormArray([])
    });

    // this.signUpForm.valueChanges.subscribe((value) => {
    //   console.log(value);
    // });

    this.signUpForm.statusChanges.subscribe((value) => {
      console.log(value);
    });
  }

  onSubmit() {
    console.log(this.signUpForm);
  }

  onAddHobby() {
    const newHobby = new FormControl(null, Validators.required);
    (<FormArray>this.signUpForm.get('hobbies')).push(newHobby);
  }

  forbiddenNames(control: FormControl): { [s: string]: boolean } {
    if (this.forbiddenUsernames.indexOf(control.value) !== -1) {
      return { 'nameIsForbidden': true };
    }

    return null;
  }

  forbiddenEmails(control: FormControl): Promise<any> | Observable<any> {
    //should be debounced : https://stackoverflow.com/questions/36919011/how-to-add-debounce-time-to-an-async-validator-in-angular-2

    const promise = new Promise<any>((resolve, reject) => {
      setTimeout(()=> {
        if(control.value === 'test@test.com') {
          resolve({'emailIsForbidden': true});
        }
        resolve(null);
      }, 1500);
    });

    return promise;
  }
}
