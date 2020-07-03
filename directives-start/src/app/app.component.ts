import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  numbers = [1, 2, 3, 4, 5];
  shownNumbers = this.numbers;
  onlyOdd = false;

  onToggleOdd(): void {
    this.onlyOdd = !this.onlyOdd;
    this.shownNumbers = this.onlyOdd ? this.numbers.filter(nb => nb%2===0) : this.numbers;
  }
}
