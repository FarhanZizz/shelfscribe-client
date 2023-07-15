import Book from "./Book";

const RecentBooks = () => {
  return (
    <div className="my-5">
      <h1 className="text-3xl text-center mb-10">Most Recent Books</h1>
      <div className="grid lg:grid-cols-5 md:grid-cols-3 gap-10">
        <Book />
        <Book />
      </div>
    </div>
  );
};

export default RecentBooks;
