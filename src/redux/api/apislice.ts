import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://shelfscribe-server.vercel.app/api/v1",
    headers: { authorization: localStorage.getItem("accessToken") },
  }),

  tagTypes: ["books", "wishlist", "reading"],

  endpoints: () => ({}),
});
