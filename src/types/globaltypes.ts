export type IReview = {
  username: string;
  review: string;
};

export interface WishlistData {
  wishlist: IBook[];
}
export interface WishlistApiResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: WishlistData;
}
export interface ReadingApiResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: ReadingData;
}
export interface ReadingData {
  reading: IBook[];
}

export type IBook = {
  _id: string;
  title: string;
  author: string;
  genre: string;
  description?: string;
  publication: string;
  reviews?: IReview[];
  image?: string;
  userEmail: string;
};
export type IGenericResponse = {
  success: boolean;
  statusCode: number;
  message: string;
  data: IBook[];
};
export type ISingleBookResponse = {
  success: boolean;
  statusCode: number;
  message: string;
  data: IBook;
};
export type IUser = {
  email: string;
  name: string;
};
