import { IBook } from "../types/globaltypes";

const Book = ({ image, title, author, publication, genre }: IBook) => {
  // const { image, title, author, publication, genre } = book;
  return (
    <div>
      <img src={image} className="h-80 w-60 mx-auto" />

      <div className="mt-2">
        <h1 className="font-bold text-center ">{title}</h1>
        <h4 className="text-xs text-center">
          {author} | {genre} | {publication}
        </h4>
      </div>
    </div>
  );
};

export default Book;
