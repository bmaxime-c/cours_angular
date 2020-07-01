import { Component, OnInit, Input, ViewEncapsulation, ContentChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-server-element',
  templateUrl: './server-element.component.html',
  styleUrls: ['./server-element.component.css'],
  encapsulation: ViewEncapsulation.Emulated
})
export class ServerElementComponent implements OnInit {
  @Input('srvElement') element: {type: string, name: string, content : string};
  @ContentChild('contentParagraph', {static:true}) paragraph : ElementRef;
  constructor() { }

  ngOnInit(): void {
    console.log('onInit myParapgraph:' + this.paragraph.nativeElement.textContent);
  }

  ngAfterContentInit(): void{
    console.log('afterContentInit myParapgraph:' + this.paragraph.nativeElement.textContent);
  }

}
