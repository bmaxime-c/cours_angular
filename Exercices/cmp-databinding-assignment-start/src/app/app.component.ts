import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  oddNumbers: number[] = [];
  evenNumbers: number[] = [];

  onIntervalFired(firedNb: number){
    if(firedNb%2 === 0) {
      this.oddNumbers.push(firedNb);
    } else {
      this.evenNumbers.push(firedNb);
    }
  }
}
