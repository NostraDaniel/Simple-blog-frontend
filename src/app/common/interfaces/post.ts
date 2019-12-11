import { IUser } from './user';
import { IImage } from './image';

export interface IPost {
  id: string;
  title: string;
  content: string;
  description: string;
  author?: IUser;
  isPublished: boolean;
  isFrontPage: boolean;
  createdOn: Date;
  frontImage: IImage;
  gallery: IImage[];
}
