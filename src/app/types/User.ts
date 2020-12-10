import {IMember} from "./IMember";
import {ISector} from "./ISector";
import {IFormDataFile, IInstanceEvent, TInstanceStatus} from "./Entities";

export type TUserRole = 'user' | 'organisation' | 'admin' | 'guest';
export type TOrgSkin = 'light' | 'dark';

export interface IUser {
  id?: string;
  email?: string;
  password?: string;
  setupPasswordToken?: string;
  role?: TUserRole;
  phoneNumber?: string;
  orgName?: string;
  emailConfirmed?: boolean;
  firstName?: string;
  lastName?: string;
  token?: string;
  gender?: 'MALE' | 'FEMALE';
  birthdayAt?: string;
  changedFields?: any[];
  status?: TInstanceStatus;
  images?: IFormDataFile[];
  _avatar?: IFormDataFile;
}

export interface IOrganisation {
  id?: string;
  logo?: string;
  phoneNumber?: string;
  skin?: TOrgSkin;
  name?: string;
  foundedAt?: string;
  country?: {
    createdAt: string;
    id: string;
    name: string;
  };
  countryCode?: string;
  countryId?: string;
  city?: string;
  website?: string;
  vision?: string;
  founderName?: string;
  founderURL?: string;
  values?: string;
  status?: TInstanceStatus;
  changedFields?: {fieldName: keyof IOrganisation, value: any}[];
  createdAt?: string;
  updatedAt?: string;
  deletedAt?: string;
  user?: IUser;
  images?: IFormDataFile[];
  sectors?: ISector[];
  events?: IInstanceEvent[];
  _sectors?: string[];
  _members?: IMember[];
  _coverImage?: IFormDataFile;
  _logoImage?: IFormDataFile;
  _visionImage?: IFormDataFile;
}
