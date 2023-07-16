/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { useParams } from "react-router-dom";
import { useSingleBookQuery } from "../redux/features/book/bookApi";

const BookDetails = () => {
  const token = localStorage.getItem("accessToken");
  const params = useParams();

  const { data } = useSingleBookQuery(params.id!);
  console.log(data?.data);

  if (!data) {
    return <div>Loading...</div>; // Handle loading state while data is being fetched
  }

  const { image, title, author, genre, publication, description, reviews } =
    data.data;

  return (
    <div className="mt-10 flex gap-10">
      <div className="flex gap-10 w-4/6  ">
        <img src={image} className="h-80 w-60 mx-auto" alt="" />
        <div>
          <h1 className="text-3xl font-medium">{title}</h1>
          <h1 className="text-xl mt-2">By {author}</h1>
          <h1 className="text-xl mt-2">Genre: {genre}</h1>
          <h1 className="text-xl mt-2">Publication: {publication}</h1>
          <h1 className="text-xl mt-2">{description}</h1>
        </div>
      </div>
      <div className="w-1/2">
        <div className="flex justify-between items-center mb-2">
          <h1 className="text-2xl mb-3">Reviews</h1>
          {token && (
            <button className="btn btn-primary btn-outline btn-sm">
              Add Your review
            </button>
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
