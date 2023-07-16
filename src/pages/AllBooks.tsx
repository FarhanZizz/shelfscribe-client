import { useState } from "react";
import Book from "../components/Book";
import { useGetBooksQuery } from "../redux/features/book/bookApi";
import { IBook } from "../types/globaltypes";

const AllBooks = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [genre, setGenre] = useState("");
  const [publicationFilter, setPublicationFilter] = useState("");

  const { data } = useGetBooksQuery({
    searchTerm,
    genre,
    publication:
      publicationFilter !== "" ? parseInt(publicationFilter) : undefined,
  });

  const publicationYears = Array.from(
    new Set(data?.data.map((book: IBook) => book.publication))
  ).sort((a, b) => Number(a) - Number(b));

  return (
    <div className="my-5">
      <div className="flex justify-between">
        <h1 className="text-4xl mb-10">All Books</h1>
        <div className="join">
          <div>
            <div>
              <input
                className="input input-bordered border-primary focus:outline-none join-item"
                name="searchTerm"
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                }}
                placeholder="Search..."
              />
            </div>
          </div>
          <select
            className="select select-bordered border-primary focus:outline-none join-item"
            value={genre}
            onChange={(e) => {
              setGenre(e.target.value);
            }}
          >
            <option value="">Genre</option>
            <option value="Fantasy">Fantasy</option>
            <option value="Fiction">Fiction</option>
            <option value="Romance">Romance</option>
            <option value="Classic">Classic</option>
            <option value="Adventure">Adventure</option>
          </select>
          <select
            className="select select-bordered border-primary focus:outline-none join-item"
            value={publicationFilter}
            onChange={(e) => {
              setPublicationFilter(e.target.value);
            }}
          >
            <option value="">Publication</option>
            {publicationYears.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="grid lg:grid-cols-5 md:grid-cols-3 gap-10">
        {data?.data.map((book: IBook) => (
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

export default AllBooks;
