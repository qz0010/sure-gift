import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CartPersonalComponent } from './cart-personal.component';

describe('CartPersonalComponent', () => {
  let component: CartPersonalComponent;
  let fixture: ComponentFixture<CartPersonalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CartPersonalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CartPersonalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
