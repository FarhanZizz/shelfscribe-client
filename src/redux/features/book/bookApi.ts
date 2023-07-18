/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { IGenericResponse, IReview } from "../../../types/globaltypes";
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
    getRecentBooks: builder.query({
      query: () => "/recent-books",
    }),
    singleBook: builder.query({
      query: (id: string) => `/book/${id}`,
      providesTags: ["books"],
    }),
    createBook: builder.mutation<IGenericResponse, IGenericResponse>({
      query: ({ data, token }) => ({
        url: `/add-new-book`,
        method: "POST",
        headers: { Authorization: token },
        body: data,
      }),
      invalidatesTags: ["books"],
    }),
    updateBook: builder.mutation<IGenericResponse, IGenericResponse>({
      query: ({ data, token, id }) => ({
        url: `/book/${id}`,
        method: "PATCH",
        headers: { Authorization: token },
        body: data,
      }),
      invalidatesTags: ["books"],
    }),
    deleteBook: builder.mutation<IGenericResponse, string>({
      query: (id: string) => ({
        url: `/book/${id}`,
        method: "DELETE",
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
    getWishlist: builder.query({
      query: ({ token }) => ({
        url: `/user/wishlist`,
        headers: { Authorization: token },
        providesTags: ["books"],
      }),
    }),
    addToWishlist: builder.mutation<IGenericResponse, IGenericResponse>({
      query: ({ data, token }) => ({
        url: `/user/add-to-wishlist`,
        method: "POST",
        headers: { Authorization: token },
        body: data,
      }),
      invalidatesTags: ["wishlist"],
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
} = bookApi;
