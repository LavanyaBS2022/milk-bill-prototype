import { Directive,ElementRef, HostListener, Input } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: '[appNumbersOnly]'
})
export class NumbersOnlyDirective {

  constructor(private _el: ElementRef) { }

  @HostListener('input', ['$event']) onInputChange(event) {
    const initalValue = this._el.nativeElement.value;
    
    // console.log(this._el);
    this._el.nativeElement.value = initalValue.replace(/[^0-9]*/g, '');
    // console.log('inital value 2',this._el.nativeElement.value);
    // console.log('compare',initalValue !== this._el.nativeElement.value)
    
    if ( initalValue !== this._el.nativeElement.value) {
      event.stopPropagation();
    }
  }

}
