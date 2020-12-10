import {IUser} from "./User";

export interface IReqCheckout extends IUser {
  agreement?: boolean;
}

export interface IReqSignUp extends IUser {
  agreement?: boolean;
}

export interface IOrganisationsReqParams {
  orgId?: string;
  offset?: number;
  limit?: number;
  details?: string;
  id?: string;
  randomizeSeed?: number;
}

export interface IProjectsReqParams extends IOrganisationsReqParams {
}
