/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { useGetReadingQuery } from "../redux/features/book/bookApi";
import Book from "../components/Book";
import { IBook } from "../types/globaltypes";

const CurrentlyReading = () => {
  const token = localStorage.getItem("accessToken");
  const { data } = useGetReadingQuery({ token });
  return (
    <div>
      <h1 className="text-4xl mb-10">Currently Reading</h1>
      <div className="grid lg:grid-cols-5 md:grid-cols-3 gap-10">
        {data?.data?.reading.map((book: IBook) => (
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

export default CurrentlyReading;
