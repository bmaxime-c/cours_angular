import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appUnless]'
})
export class UnlessDirective {
  @Input('appUnless') set unless(condition:boolean) {
    if(!condition) {
      this.vcRef.createEmbeddedView(this.tplRef);
    } else {
      this.vcRef.clear();
    }
  }
  
  constructor(private tplRef: TemplateRef<any>, private vcRef: ViewContainerRef) { }

}
