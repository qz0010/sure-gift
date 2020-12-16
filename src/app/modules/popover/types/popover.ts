import {Type} from '@angular/core';

export interface IPopoverShowHide {
  component?: Type<any>;
  show?: boolean;
  target?: HTMLElement;
  data?: any;
}
