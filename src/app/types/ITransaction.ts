import {IProductItem} from "./Entities";

export type TCheckoutStatus = 'PENDING' | 'SUCCESS' | 'FAILED' | 'CANCELED' | 'EXPIRED' | 'DELETED';

export interface ITransactionCheckout {
  id?: string;
  sessionId?: string;
  status?: TCheckoutStatus;
  createdAt?: string;
}

export interface ITransaction {
  id?: string;
  checkoutId?: string;
  donationId?: string;
  amount?: number;
  fee?: number;
  total?: number;
  // currency: string;
  // createdAt: string;
  checkout?: ITransactionCheckout;
  donation?: IProductItem;
}
