import { Link, useNavigate, useParams } from "react-router-dom";
import {
  useSingleBookQuery,
  useCreateReviewMutation,
  useDeleteBookMutation,
  useAddToWishlistMutation,
  useAddToReadingMutation,
} from "../redux/features/book/bookApi";
import { useRef, RefObject } from "react";
import jwtDecode from "jwt-decode";
import { toast } from "react-hot-toast";

const BookDetails = () => {
  const navigate = useNavigate();
  const reviewInputRef = useRef("");
  const params = useParams();
  const [deleteBook] = useDeleteBookMutation();
  const [createReview] = useCreateReviewMutation();
  const [addToWishlist, { error }] = useAddToWishlistMutation();
  const [addToReading, { error: errorMessage }] = useAddToReadingMutation();

  const token = localStorage.getItem("accessToken")!;
  const user: { email: string; name: string } = jwtDecode(token);
  const { name: username, email } = user;

  const { data } = useSingleBookQuery({ id: params.id! }!);

  if (!data) {
    return <div>Loading...</div>;
  }

  // Use optional chaining to safely access properties of 'data' object
  const {
    _id,
    image,
    title,
    author,
    genre,
    publication,
    description,
    userEmail,
  } = data?.data || {};

  const handleAddReview = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    const review: string = reviewInputRef.current.value || "";

    const newReview = { username, review };

    await createReview({ bookId: params.id, review: newReview }).then(
      (data) => {
        toast.success(data.data.message);
      }
    );

    window.add_post.close();
  };

  const handleBookDelete = async () => {
    await deleteBook(params.id!);
    navigate("/all-books");
    toast.success("Book Deleted Successfully");
  };

  const handleAddToWishlist = async () => {
    const wishlist = { book: _id };
    await addToWishlist({ data: wishlist, token: token })
      .then((data) => {
        toast.success(data.data.message);
      })
      .catch((err) => {
        toast.error(error.data.message);
      });
  };
  const handleAddToReading = async () => {
    const reading = { book: _id };
    await addToReading({ data: reading, token: token })
      .then((data) => {
        toast.success(data.data.message);
      })
      .catch((err) => {
        toast.error(errorMessage.data.message);
      });
  };

  const allreviews: { username: string; review: string }[] =
    data?.data?.reviews || [];

  return (
    <div className="mt-10 flex flex-col lg:flex-row gap-10">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:w-1/2  ">
        <div>
          <img src={image} className="h-80 w-60 mx-auto" alt="" />
          {token && email && (
            <div className="grid justify-center gap-2 my-3">
              <button
                onClick={handleAddToWishlist}
                className="btn btn-primary w-60 btn-sm btn-outline"
              >
                Add to Wishlist
              </button>
              <button
                onClick={handleAddToReading}
                className="btn btn-primary w-60 btn-sm btn-outline"
              >
                Currently Reading
              </button>
              {userEmail === email && (
                <>
                  <Link
                    to={`/edit-book/${_id}`}
                    className="btn btn-primary w-60 btn-sm btn-outline"
                  >
                    Edit Book
                  </Link>
                  <button
                    onClick={() => window.delete_confirm.showModal()}
                    className="btn btn-error btn-sm btn-outline"
                  >
                    Delete Book
                  </button>
                  <dialog id="delete_confirm" className="modal">
                    <form method="dialog" className="modal-box">
                      <h3 className="font-bold text-lg">
                        Deleting book {title}!
                      </h3>
                      <p className="py-4">
                        Are you sure you want to delete this?
                      </p>
                      <div className="modal-action">
                        {/* if there is a button in form, it will close the modal */}
                        <button
                          onClick={() => {
                            event.preventDefault();
                            window.delete_confirm.close();
                          }}
                          className="btn"
                        >
                          Cancel
                        </button>
                        <button
                          onClick={handleBookDelete}
                          className="btn btn-error"
                        >
                          Delete
                        </button>
                      </div>
                    </form>
                  </dialog>
                </>
              )}
            </div>
          )}
        </div>
        <div>
          <h1 className="text-2xl font-medium">{title}</h1>

          <h1 className="text-xl mt-2">By {author}</h1>
          <h1 className="text-xl mt-2">Genre: {genre}</h1>
          <h1 className="text-xl mt-2">Publication: {publication}</h1>
          <h1 className="text-xl mt-2">{description}</h1>
        </div>
      </div>

      <div className="w-full lg:w-2/5 mx-auto">
        <div className="flex justify-between items-center mb-2">
          <h1 className="text-2xl mb-3">Reviews</h1>
          {token && email && (
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
        <div className="grid grid-cols-1 w-full gap-4">
          {allreviews.length ? (
            allreviews.map((review: { username: string; review: string }) => (
              <div className="bg-base-200 px-5 py-3 rounded-lg">
                <span className="text-sm text-primary">{review.username}</span>
                <h1 className="text-lg">{review.review}</h1>
              </div>
            ))
          ) : (
            <div className="bg-base-200 p-5 rounded-lg">
              <h1 className="text-lg text-center">No Reviews Yet!</h1>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookDetails;
