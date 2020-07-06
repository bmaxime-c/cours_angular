import { Component } from '@angular/core';
import { CounterService } from './services/counter.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  activateCount: number;
  deactivateCount: number;

  constructor(private countService:CounterService){
    this.activateCount = countService.activatedCounter;
    this.deactivateCount = countService.deactivatedCounter;
  }
}
