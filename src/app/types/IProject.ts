import {IFormDataFile, IInstanceEvent, TInstanceStatus} from "./Entities";
import {ISector} from "./ISector";
import {IMember} from "./IMember";
import {IOrganisation} from "./User";

export type TBudgetType = 'OPEN' | 'FIXED';
export type TProjectCategory = 'ongoing' | 'completed';

export interface IProject {
  id?: string;
  organisationId?: string;
  name?: string;
  vision?: string;
  values?: string;
  category?: TProjectCategory;
  status?: TInstanceStatus;
  budgetType?: TBudgetType;
  maxBudget?: number;
  currentBudget?: number;
  createdAt?: string;
  images?: IFormDataFile[];
  sectors?: ISector[];
  events?: IInstanceEvent[];
  balance?: number;
  organisation?: IOrganisation;
  _sectors?: string[];
  _members?: IMember[];
  _coverImage?: IFormDataFile;
  _visionImage?: IFormDataFile;
}
