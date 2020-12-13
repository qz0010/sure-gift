import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class GlobalService {
  constructor() {}

  toggleBodyOverflow(set: boolean): void {
    const html = document.querySelector('html');
    if (set) {
      html.classList.add('ovh');
    } else {
      html.classList.remove('ovh');
    }
  }
}
