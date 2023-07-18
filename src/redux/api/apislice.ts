import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5000/api/v1",
    headers: { authorization: localStorage.getItem("accessToken") },
  }),

  tagTypes: ["books", "wishlist"],

  endpoints: () => ({}),
});
