import { Component, OnInit, OnDestroy } from '@angular/core';
import { interval, Subscription, Observable, Observer } from 'rxjs';
import { map, filter } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {

  firstObsSubscription: Subscription;
  constructor() { }

  ngOnDestroy(): void {
    this.firstObsSubscription.unsubscribe();
  }

  ngOnInit() {
    const customIntervalObservable = Observable.create((observer) => {
      let count = 0;
      setInterval(() => {
        observer.next(count++);
        if (count == 8) {
          observer.complete();
        }
        if (count > 3) {
          observer.error(new Error('Count is greater 3'));
        }
      }, 1000)
    })



    this.firstObsSubscription = customIntervalObservable.pipe(filter((data:number) => {return data>0;}), map((data: number) => {
      return "Round: " + (data + 1);
    })).subscribe(data => {
      console.log(data);
    }, error => { alert("ERREUR !!!!!") },
      () => { console.log("C'est fini !") });
  }

}
