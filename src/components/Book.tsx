import { Link } from "react-router-dom";
import { IBook } from "../types/globaltypes";

const Book = ({ image, title, author, publication, genre, _id }: IBook) => {
  // const { image, title, author, publication, genre } = book;
  return (
    <Link to={`/book/${_id}`} className="hover:drop-shadow-2xl">
      <img src={image} className="h-80 w-60 mx-auto" />

      <div className="mt-2">
        <h1 className="font-bold text-center ">{title}</h1>
        <h4 className="text-xs text-center">
          {author} | {genre} | {publication}
        </h4>
      </div>
    </Link>
  );
};

export default Book;
