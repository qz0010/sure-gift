import {
  Directive,
  ElementRef,
  Output,
  EventEmitter,
  Renderer2,
  AfterViewInit, OnDestroy, HostListener, Input, OnChanges, SimpleChanges,
} from '@angular/core';

@Directive({
  selector: '[appClickOutside]'
})
export class ClickOutsideDirective implements AfterViewInit, OnChanges, OnDestroy {
  constructor(private _elementRef: ElementRef, private renderer: Renderer2) {
  }
  @Input() appClickOutside: boolean;
  @Output()
  public clickOutside = new EventEmitter();
  private listener;

  @HostListener('click', ['$event'])
  onHostClick(e: Event) {
    e.stopPropagation();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.appClickOutside) {
      if (changes.appClickOutside.currentValue) {
        this.addListener();
      } else {
        this.removeListener();
      }
    }
  }

  ngAfterViewInit(): void {
  }

  addListener() {
    if (!this.listener) {
      setTimeout(() => {
        this.listener = this.renderer.listen('document', 'click', (e) => {
          this.clickOutside.emit(null);
        });
      }, 200);
    }
  }

  removeListener() {
    if (this.listener) {
      this.listener();
      this.listener = null;
    }
  }

  ngOnDestroy(): void {
    this.removeListener();
  }
}
