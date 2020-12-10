import {IFormDataFile} from "./Entities";

export interface IMember {
  fullName:	string;
  id?: string;
  image?: IFormDataFile | null | undefined;
  imageURL?: string;
  targetId?: string;
  role?:	string;
  description?:	string;
}
