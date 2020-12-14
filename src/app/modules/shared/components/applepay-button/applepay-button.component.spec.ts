import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplepayButtonComponent } from './applepay-button.component';

describe('ApplepayButtonComponent', () => {
  let component: ApplepayButtonComponent;
  let fixture: ComponentFixture<ApplepayButtonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApplepayButtonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApplepayButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
