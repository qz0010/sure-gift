export type TCurrency = 'rur' | 'rub' | 'usd' | 'eur' | 'amd';
export type TOrderStatus = 'done' | 'paid' | 'on_delivery' | 'refund' | 'cancel' | 'outdated' | 'error';

export interface IMultiLangField {
  [lang_code: string]: any;
}

export interface IMediaInfo {
  name?: string;
  path?: string;
  size?: number;
  width?: number;
  height?: number;
  palette?: any;
  color?: any;
  type?: string;
}

export interface IShowcaseTabsTab {
  title: IMultiLangField;
  text: IMultiLangField;
  poster: IMediaInfo;
}

export interface IShowcaseEvent {
  date: IMultiLangField;
  description: IMultiLangField;
  name: IMultiLangField;
  poster: IMediaInfo;
  slider: IMediaInfo[];
  spot: IMultiLangField;
  tabs: IShowcaseTabsTab[];
  lead_singer: IMultiLangField;
  orchestra: IMultiLangField;
  conductor: IMultiLangField;
  uuid: string;
}

export interface IShowcaseFundraising {
  events?: IShowcaseEvent[];
  fundraising_plan?: number;
  fundraising_slots?: number;
  _uuid: string;
  by_nominal: {
    nominal: number;
    qty: number;
    sum: number;
  }[];
  total_qty: number;
  total_sum: number;
}

export interface IShowcaseItemMeta {
  fiscal_position_title: string | IMultiLangField;
  fundraising: IShowcaseFundraising;
}

export interface IShowcaseItem {
  // Tags?: ITag[];
  // Views?: ICertificateView[];
  _uuid?: string;
  uuid?: string;
  activation_last_date?: string;
  activation_ttl?: string;
  description?: IMultiLangField;
  background_image?: IMediaInfo;
  image?: IMediaInfo;
  poster?: IMediaInfo;
  // price_modifier?: IPriceModifier;
  prices?: number[];
  prices_range?: number[];
  restrictions?: any[];
  // skin_settings?: ICertificateSkinSettings;
  is_active?: 1 | 0 | boolean;
  is_multiuse?: 1 | 0 | boolean;
  meta?: IShowcaseItemMeta;
  name?: IMultiLangField;
  name_variant?: IMultiLangField;
  summary?: IMultiLangField;
  tabs?: IShowcaseTabsTab[];
  tags?: string[];
  uuid_o?: any;
  views?: string[];
  user_friendly_url?: string;
  entity_icons?: IMediaInfo[];
  entity_label?: any;
  // seo?: ICertificateSeo;
}

export interface IPaymentMethod {
  uuid?: string;
  _uuid?: string;
  type: 'common' | 'applepay' | 'gift' | 'gpay';
  name: string;
  ext_provider_data?: any;
}

export interface ICertificateBodyItem {
  cert_config?: string;
  cert_view?: string;
  count?: number;
  price?: number;
  addressee?: ICertificateBodyAddressee;
  is_gift?: boolean;
  is_corporate?: boolean;
  sender_name?: string;
  logo?: string;
}

export interface ICertificateBodyClient {
  email?: string;
  phone?: string;
  name?: string;
}

export interface ICertificateBodyAddressee {
  email?: string;
  phone?: string;
  message?: string;
  name?: string;
}

export interface ICertificateBody {
  items?: ICertificateBodyItem[];
  client?: ICertificateBodyClient;
  payment_method?: string;
  payment_token?: string;
  lang?: string;
}

export interface ICertificateRes {
  _uuid: string;
  payment: {
    payment_url: string;
    status: 'confirm' | 'success';
  };
  status: 'complete';
  total_amount: string | number;
  total_count: number;
}

export interface IShowcaseOrderItem {
  activation_range?: string;
  amount?: number;
  media?: IMediaInfo;
  name?: IMultiLangField;
  number?: string;
  pdf?: string;
}

export interface IShowcaseOrder {
  _uuid?: string;
  code?: string;
  created_at?: string;
  items?: IShowcaseOrderItem[];
  payment?: {status: string};
  status?: TOrderStatus;
  total_amount?: string;
  total_count?: number;
}
