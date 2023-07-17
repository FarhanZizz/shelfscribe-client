/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { useParams } from "react-router-dom";
import {
  useSingleBookQuery,
  useCreateReviewMutation,
} from "../redux/features/book/bookApi";
import { useRef } from "react";
import jwtDecode from "jwt-decode";
import { toast } from "react-hot-toast";

const BookDetails = () => {
  const nameInputRef = useRef("");
  const reviewInputRef = useRef("");
  const params = useParams();
  const [createReview] = useCreateReviewMutation();

  const token = localStorage.getItem("accessToken");
  const user = jwtDecode(token);
  const { name: username, email } = user;

  const { data } = useSingleBookQuery(params.id!);

  if (!data) {
    return <div>Loading...</div>;
  }

  const {
    image,
    title,
    author,
    genre,
    publication,
    description,
    reviews,
    userEmail,
  } = data.data;

  const handleAddReview = async (e) => {
    e.preventDefault();

    const review = reviewInputRef.current.value;
    const newReview = { username, review };

    await createReview({ bookId: params.id, review: newReview }).then(
      (data) => {
        toast.success(data.data.message);
      }
    );

    console.log(newReview);

    window.add_post.close();
  };

  return (
    <div className="mt-10 flex flex-col lg:flex-row gap-10">
      <div className="flex flex-col md:flex-row gap-10 lg:w-4/6  ">
        <img src={image} className="h-80 w-60 mx-auto" alt="" />
        <div>
          <h1 className="text-3xl font-medium">{title}</h1>
          <h1 className="text-xl mt-2">By {author}</h1>
          <h1 className="text-xl mt-2">Genre: {genre}</h1>
          <h1 className="text-xl mt-2">Publication: {publication}</h1>
          <h1 className="text-xl mt-2">{description}</h1>
        </div>
      </div>

      <div>
        <div className="flex justify-between items-center mb-2">
          <h1 className="text-2xl mb-3">Reviews</h1>
          {token && (
            <>
              <button
                onClick={() => window.add_post.showModal()}
                className="btn btn-primary btn-outline btn-sm"
              >
                Add Your review
              </button>
              <dialog
                id="add_post"
                className="modal modal-bottom sm:modal-middle"
              >
                <form className="modal-box">
                  <h3 className="font-bold text-lg text-center">
                    Adding Review!
                  </h3>
                  <div className="flex flex-col justify-center items-center gap-5 my-6">
                    <input
                      type="text"
                      value={username}
                      readOnly
                      placeholder="Your Name"
                      className="input input-bordered input-primary w-full bg-base-200 focus:outline-none"
                    />
                    <textarea
                      ref={reviewInputRef}
                      className="textarea textarea-primary w-full h-28 bg-base-200 focus:outline-none"
                      placeholder="Your Review"
                    ></textarea>
                  </div>
                  <div className="modal-action">
                    {/* if there is a button in form, it will close the modal */}
                    <button
                      className="btn"
                      onClick={() => {
                        event.preventDefault();
                        window.add_post.close();
                      }}
                    >
                      Close
                    </button>
                    <button
                      className="btn btn-primary"
                      onClick={handleAddReview}
                    >
                      Submit
                    </button>
                  </div>
                </form>
              </dialog>
            </>
          )}
        </div>
        <div className="grid grid-cols-1 gap-4">
          {reviews.map((review: { username: string; review: string }) => (
            <div className="bg-base-200 px-5 py-3 rounded-lg">
              <span className="text-sm text-primary">{review.username}</span>
              <h1 className="text-lg">{review.review}</h1>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BookDetails;
