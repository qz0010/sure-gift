import {Component, ContentChild, EventEmitter, Input, Output, TemplateRef} from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {TabsTabContentTemplateDirective, TabsTabIconTemplateDirective} from '../../../directives/tabs-templates.directive';
// import {transition, trigger, useAnimation} from "@angular/animations";
// import {expandAnimationHide, expandAnimationShow} from "../../../animations";

@Component({
  selector: 'app-tabs-tab',
  templateUrl: './tabs-tab.component.html',
  styleUrls: ['./tabs-tab.component.styl'],
  // animations: [
  //   trigger('showHideTrigger', [
  //     transition(':enter', [
  //       useAnimation(expandAnimationShow, {params: {timings: '200ms ease-in-out'}})
  //     ]),
  //     transition(':leave', [
  //       useAnimation(expandAnimationHide, {params: {timings: '200ms ease-in-out'}})
  //     ]),
  //   ])
  // ]
})
export class TabsTabComponent {
  @Input() show$ = new BehaviorSubject<boolean>(false);
  @Input('tabTitle') title: string;
  @Input() titleTemplate: TemplateRef<any>;
  @Input() contentTemplate: TemplateRef<any>;
  @Input() data: any;
  @Input() uuid = 'tab';
  @Output() showHide: EventEmitter<any> = new EventEmitter();
  @Output() hide: EventEmitter<any> = new EventEmitter();
  @Output() show: EventEmitter<any> = new EventEmitter();

  @ContentChild(TabsTabContentTemplateDirective, { read: TemplateRef, static: true }) tabContentTemplate: TemplateRef<any>;
  @ContentChild(TabsTabIconTemplateDirective, { read: TemplateRef, static: true }) tabIconTemplate: TemplateRef<any>;
}
