/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */

import { useGetRecentBooksQuery } from "../redux/features/book/bookApi";
import { IBook } from "../types/globaltypes";
import Book from "./Book";

const RecentBooks = () => {
  const { data } = useGetRecentBooksQuery(undefined);
  return (
    <div className="my-5">
      <h1 className="text-3xl text-center mb-10">Most Recent Books</h1>
      <div className="grid lg:grid-cols-5 md:grid-cols-3 gap-10">
        {data?.data.map((book: IBook) => (
          <Book
            title={book.title}
            image={book.image}
            publication={book.publication}
            author={book.author}
            genre={book.genre}
            userEmail={book.userEmail}
          />
        ))}
      </div>
    </div>
  );
};

export default RecentBooks;
