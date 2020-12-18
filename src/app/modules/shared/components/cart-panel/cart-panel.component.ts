import {AfterViewInit, Component, ElementRef, HostListener, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {CartService} from '../../services/cart.service';
import {IShowcaseItem} from '../../../../types';
import {ActivatedRoute} from '@angular/router';
import {transition, trigger, useAnimation} from '@angular/animations';
import {expandAnimationHide, expandAnimationShow} from '../../../../animations';
import {Subject} from 'rxjs';
import {debounceTime, takeUntil} from 'rxjs/operators';
import {GlobalResolveDataService} from '../../services/global-resolve-data.service';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-cart-panel',
  templateUrl: './cart-panel.component.html',
  styleUrls: ['./cart-panel.component.styl'],
  animations: [
    trigger('showHideArticleTrigger', [
      transition(':enter', [
        useAnimation(expandAnimationShow, {params: {timings: '600ms ease-in-out'}})
      ]),
      transition(':leave', [
        useAnimation(expandAnimationHide, {params: {timings: '600ms ease-in-out'}})
      ]),
    ])
  ]
})
export class CartPanelComponent implements OnInit, AfterViewInit, OnDestroy {
  public data: IShowcaseItem;
  public rect: ClientRect;

  private resizeSource = new Subject();
  public setRect$ = new Subject();
  public resize$ = this.resizeSource.pipe(debounceTime(200));
  private destroyed$ = new Subject();

  @ViewChild('panel', {static: false}) panel: ElementRef;

  constructor(
    public cart: CartService,
    private route: ActivatedRoute,
    public globalResolveData: GlobalResolveDataService,
    public translate: TranslateService
  ) {
  }

  @HostListener('window:resize', ['$event'])
  onWindowResize(): void {
    this.resizeSource.next();
  }

  ngOnInit(): void {
    this.data = this.globalResolveData.showcase;

    this.resize$
      .pipe(takeUntil(this.destroyed$))
      .subscribe(() => {
        this.setRect();
      });
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.setRect();
    }, 200);
  }

  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

  setRect(): void {
    this.rect = this.panel.nativeElement.getBoundingClientRect();
    this.setRect$.next();
    this.cart.panelSetRect$.next();
  }
}
