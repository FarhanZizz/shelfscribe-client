import { useGetRecentBooksQuery } from "../redux/features/book/bookApi";
import { IBook } from "../types/globaltypes";
import Book from "./Book";

const RecentBooks = () => {
  const { data } = useGetRecentBooksQuery(undefined);
  if (!data) {
    return null;
  }
  if (!data.data || !Array.isArray(data.data)) {
    return null;
  }
  const recentBooks: IBook[] = data.data;
  return (
    <div className="my-5">
      <h1 className="text-3xl text-center mb-10">Most Recent Books</h1>
      <div className="grid lg:grid-cols-5 md:grid-cols-3 gap-10">
        {recentBooks.map((book: IBook) => (
          <Book
            key={book._id}
            _id={book._id}
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
