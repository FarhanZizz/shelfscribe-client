/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  useSingleBookQuery,
  useUpdateBookMutation,
} from "../redux/features/book/bookApi";
import { toast } from "react-hot-toast";
import jwtDecode from "jwt-decode";

const UpdateBook = () => {
  const navigate = useNavigate();
  const reviewInputRef = useRef("");
  const params = useParams();
  const token = localStorage.getItem("accessToken");
  const user = jwtDecode(token!);

  const { data } = useSingleBookQuery(params.id!);
  const [UpdateBook, { isError, error }] = useUpdateBookMutation();

  if (!data) {
    return <div>Loading...</div>;
  }

  // Use optional chaining to safely access properties of 'data' object
  const { image, title, author, genre, publication, description } =
    data?.data || {};

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

      const { data } = await UpdateBook({
        data: bookData,
        token,
        id: params.id,
      });
      toast.success(data.message);
      navigate("/all-books");
    } catch (err) {
      toast.error(err.data.message);
    }
  };

  return (
    <div>
      <h1 className="text-3xl my-3 text-center">Editing Book!</h1>
      <form
        onSubmit={handleSubmit}
        className="w-full md:w-2/3 lg:w-1/2 mx-auto"
      >
        <div className="flex gap-5 md:gap-10">
          <input
            placeholder="Book Title *"
            className="rounded-none bg-transparent focus:outline-0 input input-ghost border-0 border-b-2 border-b-primary w-full my-4"
            type="text"
            defaultValue={title}
            name="title"
            required
          />
          <input
            placeholder="Author *"
            className="rounded-none bg-transparent focus:outline-0 input input-ghost border-0 border-b-2 border-b-primary w-full my-4"
            type="text"
            defaultValue={author}
            name="author"
            required
          />
        </div>
        <div className="flex items-center gap-5 md:gap-10">
          <select
            required
            name="genre"
            defaultValue={genre}
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
            defaultValue={publication}
            name="publication"
            required
          />
        </div>
        <input
          placeholder="Image URL"
          className="rounded-none bg-transparent focus:outline-0 input input-ghost border-0 border-b-2 border-b-primary w-full my-4"
          type="text"
          defaultValue={image}
          name="image"
        />
        <textarea
          placeholder="Description "
          className="rounded-none bg-transparent focus:outline-0 input input-ghost border-0 border-b-2 border-b-primary w-full my-4 h-24"
          name="description"
          defaultValue={description}
        />
        <button type="submit" className="btn btn-primary w-full mt-2">
          Add Book
        </button>
      </form>
    </div>
  );
};

export default UpdateBook;
