import {TUserRole} from "../types/User";
import {IFormDataFile} from "../types/Entities";

export class PersonalData {
  constructor(
    public id: string,
    public phoneNumber: string,
    public email: string,
    public role: TUserRole,
    public firstName?: string,
    public lastName?: string,
    public changedFields?: any[],
    public _avatar?: IFormDataFile
) {
  }
}
