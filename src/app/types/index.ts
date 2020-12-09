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
