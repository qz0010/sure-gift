import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  private storage = {};
  constructor() {
  }

  setItem(key, val, local = false) {
    if (local) {
      this.storage[key] = val;
      return;
    }
    try {
      localStorage.setItem(key, val);
    } catch (e) {
      this.storage[key] = val;
    }
  }

  removeItem(key, local = false) {
    if (local) {
      delete this.storage[key];
      return;
    }
    try {
      localStorage.removeItem(key);
    } catch (e) {
      delete this.storage[key];
    }
  }

  getItem(key, local = false) {
    if (local) {
      return this.storage[key];
    }
    let val;
    try {
      val = localStorage.getItem(key);
    } catch (e) {
      val = this.storage[key];
    }
    return val;
  }
}
