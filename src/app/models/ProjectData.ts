import {TBudgetType, TProjectCategory} from "../types/IProject";
import {IFormDataFile, IInstanceEvent, TInstanceStatus} from "../types/Entities";
import {ISector} from "../types/ISector";
import {IOrganisation} from "../types/User";

export class ProjectData {
  constructor(
    public id?: string,
    public organisationId?: string,
    public name?: string,
    public vision?: string,
    public values?: string,
    public category?: TProjectCategory,
    public status?: TInstanceStatus,
    public budgetType?: TBudgetType,
    public maxBudget?: number,
    public currentBudget?: number,
    public createdAt?: string,
    public images?: IFormDataFile[],
    public sectors?: ISector[],
    public events?: IInstanceEvent[],
    public balance?: number,
    public organisation?: IOrganisation,
    public _sectors?: string[],
    public _coverImage?: IFormDataFile,
    public _visionImage?: IFormDataFile
  ) {

  }
}
