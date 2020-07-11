import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  
  theForm: FormGroup;
  private forbiddenNames: string[] = ['Test'];
  statuses= ['Stable', 'Critical', 'Finished'];

  ngOnInit(): void {
    this.theForm = new FormGroup({
      'projectname': new FormControl(null, [Validators.required, this.nameValidator.bind(this)]),
      'email': new FormControl(null, [Validators.required, Validators.email]),
      'projectstatus': new FormControl(null)
    });
  }

  onSubmit() {
    console.log(this.theForm.value);
  }

  nameValidator(control: FormControl): { [s: string]: boolean } {
    if (this.forbiddenNames.indexOf(control.value) !== -1) {
      return { 'nameIsForbidden': true };
    }

    return null;
  }
}
