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
      query: ({ data }) => ({
        url: `/add-new-book`,
        method: "POST",
        body: data,
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
  }),
});

export const {
  useGetBooksQuery,
  useGetRecentBooksQuery,
  useSingleBookQuery,
  useCreateReviewMutation,
} = bookApi;
