export type IReview = {
  username: string;
  review: string;
};

export type IBook = {
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
