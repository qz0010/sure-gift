import {Directive, ElementRef, Input, OnInit} from '@angular/core';
import {NgControl} from '@angular/forms';

@Directive({
  selector: '[appNativeElementControl]'
})
export class NativeElementControlDirective implements OnInit {
  constructor(private el: ElementRef, private control: NgControl) { }

  ngOnInit() {
    (this.control.control as any).nativeElement = this.el.nativeElement;
  }
}
