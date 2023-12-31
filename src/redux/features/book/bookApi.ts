import {
  IBook,
  IGenericResponse,
  IReview,
  ISingleBookResponse,
  ReadingApiResponse,
  WishlistApiResponse,
} from "../../../types/globaltypes";
import { api } from "../../api/apislice";

const bookApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getBooks: builder.query<
      IGenericResponse,
      { searchTerm?: string; genre?: string; publication?: number }
    >({
      query: ({ searchTerm, genre, publication }) => {
        let url = "/all-books";

        // Append query parameters for search and filter
        if (searchTerm) {
          url += `?searchTerm=${searchTerm}`;
        }

        if (genre) {
          url += `${searchTerm ? "&" : "?"}genre=${genre}`;
        }

        if (publication) {
          url += `${searchTerm || genre ? "&" : "?"}publication=${publication}`;
        }

        return url;
      },
      providesTags: ["books"],
    }),
    getRecentBooks: builder.query<IGenericResponse, undefined>({
      query: () => "/recent-books",
    }),
    singleBook: builder.query<ISingleBookResponse, { id: string }>({
      query: ({ id }) => `/book/${id}`,
      providesTags: ["books"],
    }),
    createBook: builder.mutation<
      IGenericResponse,
      { data: IBook; token: string }
    >({
      query: ({ data, token }) => ({
        url: `/add-new-book`,
        method: "POST",
        headers: { Authorization: token },
        body: data,
      }),
      invalidatesTags: ["books"],
    }),
    updateBook: builder.mutation<
      IGenericResponse,
      { data: IBook; token: string; id: string }
    >({
      query: ({ data, token, id }) => ({
        url: `/book/${id}`,
        method: "PATCH",
        headers: { Authorization: token },
        body: data,
      }),
      invalidatesTags: ["books"],
    }),
    deleteBook: builder.mutation<
      IGenericResponse,
      { id: string; token: string }
    >({
      query: ({ id, token }) => ({
        url: `/book/${id}`,
        method: "DELETE",
        headers: { Authorization: token },
      }),
      invalidatesTags: ["books"],
    }),
    createReview: builder.mutation<
      IGenericResponse,
      { bookId: string; review: IReview }
    >({
      query: ({ bookId, review }) => ({
        url: `/add-review/${bookId}`,
        method: "POST",
        body: review,
      }),
      invalidatesTags: ["books"],
    }),
    getWishlist: builder.query<WishlistApiResponse, { token: string }>({
      query: ({ token }) => ({
        url: `/user/wishlist`,
        headers: { Authorization: token },
        providesTags: ["wishlist"],
      }),
    }),
    addToWishlist: builder.mutation<
      IGenericResponse,
      { data: { book: string | undefined }; token: string }
    >({
      query: ({ data, token }) => ({
        url: `/user/add-to-wishlist`,
        method: "POST",
        headers: { Authorization: token },
        body: data,
      }),
      invalidatesTags: ["wishlist"],
    }),
    getReading: builder.query<ReadingApiResponse, { token: string }>({
      query: ({ token }) => ({
        url: `/user/reading`,
        headers: { Authorization: token },
        providesTags: ["reading"],
      }),
    }),
    addToReading: builder.mutation<
      IGenericResponse,
      { data: { book: string | undefined }; token: string }
    >({
      query: ({ data, token }) => ({
        url: `/user/add-to-reading`,
        method: "POST",
        headers: { Authorization: token },
        body: data,
      }),
      invalidatesTags: ["reading"],
    }),
  }),
});

export const {
  useGetBooksQuery,
  useGetRecentBooksQuery,
  useSingleBookQuery,
  useCreateReviewMutation,
  useCreateBookMutation,
  useDeleteBookMutation,
  useUpdateBookMutation,
  useAddToWishlistMutation,
  useGetWishlistQuery,
  useGetReadingQuery,
  useAddToReadingMutation,
} = bookApi;
