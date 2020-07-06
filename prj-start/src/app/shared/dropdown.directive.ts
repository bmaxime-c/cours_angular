import { Directive, ElementRef, Renderer2, HostListener, HostBinding } from '@angular/core';

@Directive({
  selector: '[appDropdown]'
})
export class DropdownDirective {

  @HostBinding('class.open') isOpened: boolean = false;

  constructor(private elRef: ElementRef, private renderer: Renderer2) { }

  // @HostListener('click') click(eventData: Event) {
  //   this.isOpened = !this.isOpened;
  // }

  @HostListener('document:click', ['$event']) toggleOpen(event: Event) {
    this.isOpened = this.elRef.nativeElement.contains(event.target) ? !this.isOpened : false;
  }
}
