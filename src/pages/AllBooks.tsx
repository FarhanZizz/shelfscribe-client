import Book from "../components/Book";

const AllBooks = () => {
  return (
    <div className="my-5">
      <div className="flex justify-between">
        <h1 className="text-4xl  mb-10">All Books</h1>
        <div className="join">
          <div>
            <div>
              <input
                className="input input-bordered border-primary focus:outline-none join-item"
                placeholder="Search..."
              />
            </div>
          </div>
          <select className="select select-bordered border-primary focus:outline-none join-item">
            <option disabled selected>
              Category
            </option>
            <option>Sci-fi</option>
            <option>Drama</option>
            <option>Action</option>
          </select>
          <select className="select select-bordered border-primary focus:outline-none join-item">
            <option disabled selected>
              Publication
            </option>
            <option>Sci-fi</option>
            <option>Drama</option>
            <option>Action</option>
          </select>
          <div className="indicator">
            <button className="btn btn-primary join-item">Search</button>
          </div>
        </div>
      </div>
      <div className="grid lg:grid-cols-5 md:grid-cols-3 gap-10">
        <Book />
        <Book />
        <Book />
        <Book />
        <Book />
      </div>
    </div>
  );
};

export default AllBooks;
