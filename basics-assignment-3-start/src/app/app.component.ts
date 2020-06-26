import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  passwordDisplayed: boolean = false;
  logs = [];

  tooglePassword() {
    this.passwordDisplayed = !this.passwordDisplayed;
    this.addLog(this.passwordDisplayed);
  }

  addLog(state) {
    this.logs.push(this.logs.length + " - "+"Button click. password is "+(state?"shown":"hidden"));
  }
}
