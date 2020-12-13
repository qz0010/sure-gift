import {
  animation, animate, style} from '@angular/animations';

export const expandAnimationShow = animation([
  style({
    opacity: '0',
    height: '0px',
    overflow: 'hidden'
  }),
  animate('{{ timings }}', style({
    opacity: '1',
    height: '*',
    overflow: '*'
  }))
]);

export const expandAnimationHide = animation([
  style({
    opacity: '1',
    height: '*',
    overflow: 'hidden'
  }),
  animate('{{ timings }}', style({
    opacity: '0',
    height: '0px',
    overflow: 'hidden'
  }))
]);

export const fadeAnimationShow = animation([
  style({
    opacity: '0',
  }),
  animate('{{ timings }}', style({
    opacity: '1',
  }))
]);

export const fadeAnimationHide = animation([
  animate('{{ timings }}', style({
    opacity: '0',
  }))
]);
