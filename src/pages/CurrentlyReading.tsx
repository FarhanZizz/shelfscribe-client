import { useGetReadingQuery } from "../redux/features/book/bookApi";
import Book from "../components/Book";
import { IBook } from "../types/globaltypes";

const CurrentlyReading = () => {
  const token: string = localStorage.getItem("accessToken")!;
  const { data } = useGetReadingQuery({ token });
  if (!data) {
    return null;
  }
  return (
    <div>
      <h1 className="text-4xl mb-10">Currently Reading</h1>
      <div className="grid lg:grid-cols-5 md:grid-cols-3 gap-10">
        {data.data.reading.length ? (
          data.data.reading.map((book: IBook) => (
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
          ))
        ) : (
          <h1 className="text-lg text-center">No books Yet!</h1>
        )}
      </div>
    </div>
  );
};

export default CurrentlyReading;
