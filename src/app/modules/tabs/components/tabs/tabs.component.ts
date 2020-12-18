import {
  AfterContentInit,
  Component, ContentChildren, ElementRef, EventEmitter,
  Input, Output,
  QueryList, ViewChild
} from '@angular/core';
import {TabsTabComponent} from './tabs-tab/tabs-tab.component';
// import {StorageService} from "../../services/storage.service";
// import {get as getCookie, set as setCookie} from 'js-cookie';
// import {addMinutes} from "date-fns";

interface IStorageData {
  tab: string;
}

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.styl']
})
export class TabsComponent implements AfterContentInit {
  @ContentChildren(TabsTabComponent) tabs: QueryList<TabsTabComponent>;
  @ViewChild('tabsTmp', {static: false}) tabsTmp: ElementRef;
  @Output() showHideTabs: EventEmitter<any> = new EventEmitter();
  @Output() showTabs: EventEmitter<any> = new EventEmitter();
  @Input() dynamic = false;
  @Input() theme;
  @Input() pad;
  @Input() title;
  @Input() uuid: string;
  @Input() store = true;
  @Input() storageKey = 'tabs';
  @Input() storageExpires: Date;

  constructor() {
  }
  //
  // private get storeExpires(): Date {
  //   return this.storageExpires || addMinutes(new Date(), 30);
  // }

  ngAfterContentInit() {
    // this.uuid = this.uuid || 'tabs_uuid';
    // this.storageKey = `${this.storageKey}_${this.uuid}`;
    // const storageData = getCookie(this.storageKey);
    // const storage: IStorageData = storageData ? JSON.parse(storageData) : null;
    // const activeTab = storage ? this.tabs.find(t => t.uuid === storage.tab) : null;
    Promise.resolve(null).then(() => {
      // this.selectTab(activeTab || this.tabs.first);
      this.selectTab(this.tabs.first);
    });
  }

  // saveToStorage(tab: string) {
  //   if (this.store) {
  //     setCookie(this.storageKey, JSON.stringify({
  //       tab
  //     } as IStorageData), {expires: this.storeExpires});
  //   }
  // }

  selectTab(tab) {
    this.tabs.toArray().forEach(_tab => {
      if (_tab.show$.getValue()) {
        _tab.showHide.emit({value: false, data: _tab.data});
        this.showHideTabs.emit({value: false, data: _tab.data});
        _tab.hide.emit(_tab.data);
        _tab.show$.next(false);
      }
    });
    if (tab && !tab.show$.getValue()) {
      // const viewRef = tab.contentTemplate.createEmbeddedView(tab.contentTemplate);
      // viewRef.detectChanges();
      tab.show$.next(true);
      tab.showHide.emit({value: true, data: tab.data});
      tab.show.emit(tab.data);
      this.showHideTabs.emit({value: true, data: tab.data});
      this.showTabs.emit(tab.data);
      // this.saveToStorage(tab.uuid);
    }
  }
}
