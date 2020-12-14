import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GpayButtonComponent } from './gpay-button.component';

describe('GpayButtonComponent', () => {
  let component: GpayButtonComponent;
  let fixture: ComponentFixture<GpayButtonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GpayButtonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GpayButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
