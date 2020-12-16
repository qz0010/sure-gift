import {ChangeDetectorRef, Component, NgZone, OnInit, Renderer2, ViewChild, ViewContainerRef} from '@angular/core';
import {delay, filter, switchMap} from 'rxjs/operators';
import {Observable, of} from 'rxjs';
import {IPopoverShowHide} from '../../types/popover';
import {PopoverService} from '../../services/popover.service';
import {DynamicComponentService} from '../../../dynamic-component/services/dynamic-component.service';

@Component({
  selector: 'app-popover',
  templateUrl: './popover.component.html',
  styleUrls: ['./popover.component.styl']
})
export class PopoverComponent implements OnInit {
  @ViewChild('container', {read: ViewContainerRef, static: false}) container: ViewContainerRef;
  public showHide$: Observable<IPopoverShowHide>;
  public position: ClientRect;
  public show = false;

  constructor(
    private popoverService: PopoverService,
    private dcService: DynamicComponentService,
    private renderer: Renderer2,
    private zone: NgZone,
    private detectorRef: ChangeDetectorRef
  ) {
    this.showHide$ = this.popoverService.showHide$;
    this.showHide$
      .pipe(
        switchMap(data => {
          return of(data)
            .pipe(
              delay(5),
              switchMap(() => {
                this.position = null;
                if (data?.show) {
                  this.dcService.create(data.component, this.container);
                }
                this.detectorRef.detectChanges();
                return of(data).pipe(delay(200));
              })
            );
        })
      )
      .subscribe(data => {
        if (data?.show) {
          const rect: ClientRect = data.target?.getBoundingClientRect();
          this.position = {...rect};
          const {top, left, height} = rect;
          const $parent = this.container.element?.nativeElement?.parentElement;
          this.position.top = top + height + 5;
          if ($parent) {
            this.position.left = left - ($parent.clientWidth - rect.width) / 2;
          }
          const pos = this.position;
          if (pos.top + $parent.clientHeight > window.innerHeight) {
            this.position.top = window.innerHeight - $parent.clientHeight - 5;
          }
          if (pos.left + $parent.clientWidth > window.innerWidth) {
            this.position.left = rect.left - $parent.clientWidth + rect.width;
          }
        }
      });
    this.subToScroll();
  }

  ngOnInit(): void {
  }

  subToScroll(): void {
    this.zone.runOutsideAngular(() => {
      this.renderer.listen('window', 'scroll', () => {
        this.popoverService.close();
      });
    });
  }
}
