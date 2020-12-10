import {IMember} from "./IMember";

export interface ISocialMediaURLs {
  facebook?: string;
  instagram?: string;
  telegram?: string;
  vk?: string;
  youtube?: string;
}

export interface IContentWhats {
  title?: string;
  description?: string;
  mission?: string;
  backgroundURL?: string;
  members?: IMember[];
  socialMediaURLs?: ISocialMediaURLs;
}

export interface IContentHome {
  title?: string;
  tagline?: string;
  videoURL?: string;
}
