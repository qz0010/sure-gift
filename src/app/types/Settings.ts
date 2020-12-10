import {IContentHome, IContentWhats} from "./Content";

export interface ISettingsCommissionFee {
  singlePaymentFee: number;
  regularPaymentFee: number;
}

export interface ISettingsDonationOptions {
  organisationCard: number[];
  organisationPage: number[];
  projectCard: number[];
  projectPage: number[];
}

export interface ISettings {
  fee?: ISettingsCommissionFee;
  donations?: ISettingsDonationOptions;
  contentHome?: IContentHome;
  contentWhats?: IContentWhats;
}
