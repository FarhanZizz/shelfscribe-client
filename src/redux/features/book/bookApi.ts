import { IGenericResponse } from "../../../types/globaltypes";
import { api } from "../../api/apislice";

const bookApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getBooks: builder.query({
      query: () => "/all-books",
    }),
    getRecentBooks: builder.query({
      query: () => "/recent-books",
    }),
    singleBook: builder.query({
      query: (id: string) => `/book/${id}`,
    }),
    createBook: builder.mutation<IGenericResponse, IGenericResponse>({
      query: ({ data }) => ({
        url: `/add-new-book`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["books"],
    }),
    getComment: builder.query({
      query: (id: string) => `/comment/${id}`,
      providesTags: ["books"],
    }),
  }),
});

export const { useGetBooksQuery, useGetRecentBooksQuery } = bookApi;
