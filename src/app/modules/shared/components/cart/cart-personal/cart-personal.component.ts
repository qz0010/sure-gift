import {Component, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild} from '@angular/core';
import {Subscription} from 'rxjs';
import {CartService} from '../../../services/cart.service';
import {IReqCheckout} from '../../../../../types/req';
import {FormService} from '../../../services/form.service';
import {IUser} from '../../../../../types/User';
import {NgForm} from '@angular/forms';
import {IPaymentMethod, TPaymentMethodType} from '../../../../../types';
import {DocService} from '../../../services/doc.service';

@Component({
  selector: 'app-cart-personal',
  templateUrl: './cart-personal.component.html',
  styleUrls: ['./cart-personal.component.styl']
})
export class CartPersonalComponent
  // extends ExtendFormErrorsComponent
  implements OnInit, OnDestroy
{
  @Input() paymentMethods: IPaymentMethod[];

  @Output() selectPaymentMethod = new EventEmitter<IPaymentMethod>();
  @Output() submitForm = new EventEmitter<IUser>();

  public personalData: IReqCheckout;
  public paymentMethod: TPaymentMethodType = 'common';
  private subsriptions: Subscription[] = [];
  private formName = 'cartPersonalForm';

  @ViewChild('form', {static: false}) formRef: NgForm;

  constructor(
    public cart: CartService,
    private formService: FormService,
    public doc: DocService
  ) {
    // super();
  }

  ngOnInit() {
    const saved: IReqCheckout = this.formService.getFormValues(this.formName);
    const getDataModel = (u: IReqCheckout = {}): IReqCheckout => {
      return {
        firstName: u.firstName || '',
        lastName: u.lastName || '',
        phoneNumber: u.phoneNumber || '',
        email: u.email || '',
        agreement: u.agreement || false
      };
    };
    this.personalData = getDataModel(saved);
  }

  ngOnDestroy(): void {
    // super.ngOnDestroy();
    this.subsriptions.map(s => s.unsubscribe());
  }

  onPaymentMethodClick(pm: IPaymentMethod): void {
    this.paymentMethod = pm.type;
    this.selectPaymentMethod.emit(pm);
  }

  onSubmit() {
    if (this.formRef.valid) {
      this.formService.saveFormValues(this.formName, this.formRef.value);
      this.submitForm.emit(this.personalData);
    }
  }
}
