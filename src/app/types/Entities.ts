import {IOrganisation, IUser} from "./User";
import {IProject} from "./IProject";

export interface IMultilangString {
  [lang: string]: any;
}

export interface ILanguage {
  val: string;
  name: string;
  icon?: string;
  emoji?: string;
}

export interface INavLink {
  name: IMultilangString;
  route: string;
}

export type TDonationType = 'single' | 'recuring';
export type TDonationTargetType = 'ORG' | 'PROJECT';
export type TDonationStatus = 'pending' | 'checkout' | 'finished' | 'active' | 'success' | 'deleted' | 'paused';
export interface IProductItemProject extends IProject {
  organisation?: IOrganisation;
}
export interface IProductItem {
  targetId: string;
  amount: number;
  type: TDonationType;
  targetType: TDonationTargetType;
  status?: TDonationStatus;
  project?: IProductItemProject;
  organisation?: IOrganisation;
  id?: string;
  user?: IUser;
  _org?: IOrganisation;
  _project?: IProject;
  createdAt?: string;
}

export interface ISocialMediaURLs {
  facebook: string;
  telegram: string;
  instagram: string;
  youtube: string;
  vk: string;
}

export type TFileTypes =
  'user-avatar'
  | 'org-logo'
  | 'org-background'
  | 'project-background'
  | 'project-vision'
  | 'member-image'
  | 'org-vision';
export type TFileStatuses = 'APPROVED' | 'PENDING_APPROVAL';
export interface IFormDataFile {
  type: TFileTypes;
  ownerId?: string;
  file?: File;
  id?: string;
  status?: TFileStatuses;
  url?: string;
  thumbnailURL?: string;
}

export type TInstanceStatus = 'new' | 'pending-approval' | 'approved' | 'changed' | 'ACTIVE' | 'revoked' | 'DEACTIVATED';

export type TInstanceEventTypes = 'ORG_SIGNUP' | 'ORG_PROFILE_UPDATED' | 'ORG_PROJECT_UPDATED' | 'ORG_PROJECT_UPDATION_REJECTED' | 'USER_PROFILE_UPDATED';
export type TInstanceEventStatuses = 'NEW' | 'READED';

export interface IInstanceEventPayload extends IProject {
  message?: string;
  pr?: IProject;
}
export interface IInstanceEvent {
  id?: string;
  targetId?: string;
  type?: TInstanceEventTypes;
  payload?: IInstanceEventPayload;
  status?: TInstanceEventStatuses;
  createdAt?: string;
}

export interface ILink {
  name: string;
  route: string;
}

export interface ISupportForm extends IUser {
  message: string;
}

export interface IQuillEditor {
  [key: string]: any;
}
