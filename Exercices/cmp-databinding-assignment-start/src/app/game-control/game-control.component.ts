import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { OddComponent } from '../odd/odd.component';
import { EvenComponent } from '../even/even.component';

@Component({
  selector: 'app-game-control',
  templateUrl: './game-control.component.html',
  styleUrls: ['./game-control.component.css']
})
export class GameControlComponent implements OnInit {
  @Output() intervalFired = new EventEmitter<number>();
  incrementedNumber: number = 0;
  interval: any;

  elements: any[];

  constructor() { }

  ngOnInit(): void {
  }

  onGameStart(): void {
    this.interval = setInterval(() => {
      this.intervalFired.emit(++this.incrementedNumber);
    }, 1000);
  }

  onGameStop(): void {
    clearInterval(this.interval);
  }
}
