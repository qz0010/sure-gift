import {Directive, TemplateRef} from '@angular/core';

@Directive({
  selector: '[app-tabs-tab-content-tmp]'
})
export class TabsTabContentTemplateDirective {

  constructor(public template: TemplateRef<any>) { }

}

@Directive({
  selector: '[app-tabs-tab-icon-tmp]'
})
export class TabsTabIconTemplateDirective {

  constructor(public template: TemplateRef<any>) { }

}
