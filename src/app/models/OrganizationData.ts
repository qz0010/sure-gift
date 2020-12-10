import {TOrgSkin} from "../types/User";
import {IMember} from "../types/IMember";
import {IFormDataFile, TInstanceStatus} from "../types/Entities";
import {ISector} from "../types/ISector";

export class OrganizationData {
  constructor(
    public id?: string,
    public logo?: string,
    public phoneNumber?: string,
    public skin?: TOrgSkin,
    public name?: string,
    public countryId?: string,
    public city?: string,
    public website?: string,
    public vision?: string,
    public founderName?: string,
    public founderURL?: string,
    public values?: string,
    public status?: TInstanceStatus,
    public changedFields?: any[],
    public createdAt?: string,
    // public updatedAt?: string,
    // public deletedAt?: string,
    // public user?: IUser,
    public sectors?: ISector[],
    public _members?: IMember[],
    public _sectors?: string[],
    public _coverImage?: IFormDataFile,
    public _logoImage?: IFormDataFile,
    public _visionImage?: IFormDataFile
  ) {
  }
}
