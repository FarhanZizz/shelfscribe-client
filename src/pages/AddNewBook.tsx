/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */

import { toast } from "react-hot-toast";
import { useCreateBookMutation } from "../redux/features/book/bookApi";
import jwtDecode from "jwt-decode";
import { useNavigate } from "react-router-dom";

/* eslint-disable @typescript-eslint/no-unsafe-assignment */
const AddNewBook = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("accessToken");
  const user = jwtDecode(token!);
  const [createBook] = useCreateBookMutation();
  const handleSubmit = async (e: {
    preventDefault: () => void;
    target: any;
  }) => {
    e.preventDefault();
    const form = e.target;
    const title = form.title.value;
    const author = form.author.value;
    const genre = form.genre.value;
    const publication = form.publication.value;
    let image = form.image.value;
    const description = form.description.value;

    if (!image) {
      image =
        "https://innovating.capital/wp-content/uploads/2021/05/vertical-placeholder-image-400x533.jpg";
    }

    try {
      const bookData = {
        title,
        author,
        genre,
        publication,
        image,
        description,
        userEmail: user.email,
      };

      const { data } = await createBook({ data: bookData, token });
      toast.success(data.message);
      navigate("/all-books");
    } catch (err) {
      toast.error(err.data.message);
    }
  };
  return (
    <div>
      <h1 className="text-3xl my-3 text-center">Add Your Own Book!</h1>
      <form
        onSubmit={handleSubmit}
        className="w-full md:w-2/3 lg:w-1/2 mx-auto"
      >
        <div className="flex gap-5 md:gap-10">
          <input
            placeholder="Book Title *"
            className="rounded-none bg-transparent focus:outline-0 input input-ghost border-0 border-b-2 border-b-primary w-full my-4"
            type="text"
            name="title"
            required
          />
          <input
            placeholder="Author *"
            className="rounded-none bg-transparent focus:outline-0 input input-ghost border-0 border-b-2 border-b-primary w-full my-4"
            type="text"
            name="author"
            required
          />
        </div>
        <div className="flex items-center gap-5 md:gap-10">
          <select
            required
            name="genre"
            defaultValue=""
            className="select select-primary w-full border-0 border-b-2 border-b-primary focus:outline-0 rounded-none"
          >
            <option disabled hidden>
              Genre *
            </option>
            <option value="Fantasy">Fantasy</option>
            <option value="Fiction">Fiction</option>
            <option value="Romance">Romance</option>
            <option value="Classic">Classic</option>
            <option value="Adventure">Adventure</option>
          </select>
          <input
            placeholder="Publication Year *"
            className="rounded-none bg-transparent focus:outline-0 input input-ghost border-0 border-b-2 border-b-primary w-full my-4"
            type="number"
            name="publication"
            required
          />
        </div>
        <input
          placeholder="Image URL"
          className="rounded-none bg-transparent focus:outline-0 input input-ghost border-0 border-b-2 border-b-primary w-full my-4"
          type="text"
          name="image"
        />
        <textarea
          placeholder="Description "
          className="rounded-none bg-transparent focus:outline-0 input input-ghost border-0 border-b-2 border-b-primary w-full my-4 h-24"
          name="description"
        />
        <button type="submit" className="btn btn-primary w-full mt-2">
          Add Book
        </button>
      </form>
    </div>
  );
};

export default AddNewBook;
