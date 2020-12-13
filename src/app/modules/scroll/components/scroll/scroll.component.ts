import {
  AfterViewInit,
  Component,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Renderer2,
  SimpleChanges,
  ViewChild
} from '@angular/core';
import {DeviceDetectorService} from 'ngx-device-detector';
import {Observable, Subscription} from 'rxjs';
// import animateScrollTo from 'animated-scroll-to';

export interface IScrollOnClick {
  mobileOnly?: boolean;
}

export interface IOptions {
  scrollOnClick?: IScrollOnClick | any;
}

export interface IScrollOnClickOptions {
  animate?: boolean;
}

export interface IItem {
  width: number;
  offsetLeft: number;
  options?: IScrollOnClickOptions;
}

@Component({
  selector: 'app-scroll',
  templateUrl: './scroll.component.html'
})
export class ScrollComponent implements OnInit, AfterViewInit, OnChanges, OnDestroy {
  @Input() options: IOptions = {};
  @Input() itemClick$: Observable<any>;

  @ViewChild('container', {static: true}) container;

  subscriptions: Subscription[] = [];
  isDesktop = this.device.isDesktop();
  downX: number;
  mouseDownListener: any;
  mouseMoveListener: any;
  mouseUpListener: any;
  positionWillChange = false;
  mouseListening = false;
  smoothScroll = false;

  constructor(private device: DeviceDetectorService, private renderer: Renderer2) {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['itemClick$'] && this.itemClick$ && this.options.scrollOnClick) {
      if (this.options.scrollOnClick.mobileOnly && this.isDesktop) {
        return;
      }
      this.subscriptions.push(
        this.itemClick$.subscribe((rect: IItem) => {
          this.scrollToMid(rect);
        })
      );
    }
  }

  ngOnInit() {
    if (this.isDesktop) {
      this.mouseDownListener = this.renderer.listen(this.container.nativeElement, 'mousedown', this.mouseDownHandler.bind(this));
    }
    // this.mouseMoveListener = this.mouseMoveHandler.bind(this);
    // this.mouseUpListener = this.stopListeners.bind(this);
    // this.mouseDownListener = this.mouseDownHandler.bind(this);
    // this.container.nativeElement.addEventListener('mousedown', this.mouseDownListener);
  }

  ngOnDestroy(): void {
    if (this.mouseDownListener) {
      this.mouseDownListener();
    }
    // this.container.nativeElement.removeEventListener('mousedown', this.mouseDownListener);
  }

  ngAfterViewInit(): void {
    // Promise.resolve(null).then(() => {
    //   this.smoothScroll = true;
    // });
  }

  startListeners() {
    this.mouseMoveListener = this.renderer.listen('document', 'mousemove', (e) => {
      this.mouseMoveHandler(e);
    });
    this.mouseUpListener = this.renderer.listen('document', 'mouseup', (e) => {
      this.stopListeners(e);
    });
    // document.addEventListener('mouseup', this.mouseUpListener);
    // document.addEventListener('mousemove', this.mouseMoveListener);
  }

  stopListeners(event) {
    event.preventDefault();
    this.mouseMoveListener();
    this.mouseUpListener();
    // document.removeEventListener('mousemove', this.mouseMoveListener);
    // document.removeEventListener('mouseup', this.mouseUpListener);
    this.mouseListening = false;
  }

  mouseDownHandler(event) {
    event.preventDefault();
    this.startListeners();
    this.downX = event.clientX;
  }

  mouseMoveHandler(event) {
    const $container = this.container.nativeElement;
    const currScroll = $container.scrollLeft;
    const scroll = currScroll - event.clientX + this.downX;

    if (currScroll - scroll !== 0) {
      this.mouseListening = true;
    }
    $container.scrollLeft = scroll;
    this.downX = event.clientX;
  }

  onMouseEnter() {
    this.positionWillChange = true;
  }

  onMouseLeave() {
    this.positionWillChange = false;
  }

  scrollToMid(item: IItem) {
    const $container = this.container.nativeElement;
    const { width, offsetLeft } = item;
    const containerMid = $container.clientWidth / 2;
    const itemLeft = offsetLeft - $container.offsetLeft;
    const currScroll = $container.scrollLeft;
    let mid = Math.max(0, itemLeft - containerMid + width / 2);

    if (width > containerMid) {
      if (currScroll <= itemLeft) {
        mid += width / 2;
      } else if (itemLeft <= currScroll) {
        mid -= width / 2;
      }
    }
    if (item.options && !item.options.animate) {
      // this.smoothScroll = false;
      $container.scrollTo(mid, 0);
      return;
    }

    const frontier = $container.clientWidth / 2;
    if (Math.abs(mid - currScroll) > frontier) {
      // const frontierW = mid - width * 2;
      // this.smoothScroll = false;
      $container.scrollTo(mid, 0);
      // setTimeout(() => {
        // this.smoothScroll = true;
      // }, 200);
      return;
    }
    // $container.scrollTo(mid, 0);
    // animateScrollTo(mid, {horizontal: true, element: $container});
  }
}
