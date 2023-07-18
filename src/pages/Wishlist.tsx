import React from "react";
import { useGetWishlistQuery } from "../redux/features/book/bookApi";
import Book from "../components/Book";

const Wishlist = () => {
  const token = localStorage.getItem("accessToken");
  const { data } = useGetWishlistQuery({ token });
  console.log(data);
  return (
    <div>
      <h1 className="text-4xl mb-10">Wishlisted Books</h1>
      <div className="grid lg:grid-cols-5 md:grid-cols-3 gap-10">
        {data?.data?.wishlist.map((book: IBook) => (
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

export default Wishlist;
