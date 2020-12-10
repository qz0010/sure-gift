export type TSectorType = 'project' | 'organisation';

export interface ISector {
  id:	string;
  name:	string;
  type: TSectorType;
  createdAt:	string;
}
