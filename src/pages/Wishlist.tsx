import { useGetWishlistQuery } from "../redux/features/book/bookApi";
import Book from "../components/Book";
import { IBook } from "../types/globaltypes";

const Wishlist = () => {
  const token: string = localStorage.getItem("accessToken")!;
  const { data } = useGetWishlistQuery({ token });
  if (!data) {
    return <p>Loading..</p>;
  }
  return (
    <div>
      <h1 className="text-4xl mb-10">Wishlisted Books</h1>
      <div className="grid lg:grid-cols-5 md:grid-cols-3 gap-10">
        {data.data.wishlist.length ? (
          data.data.wishlist.map((book: IBook) => (
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

export default Wishlist;
