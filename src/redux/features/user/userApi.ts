import { api } from "../../api/apislice";
import { IGenericResponse } from "../../../types/globaltypes";

const userApi = api.injectEndpoints({
  endpoints: (builder) => ({
    userLogin: builder.mutation<
      IGenericResponse,
      { email: string; password: string }
    >({
      query: (credentials) => ({
        url: "/auth/login",
        method: "POST",
        body: credentials,
      }),
    }),
    userSignup: builder.mutation<
      IGenericResponse,
      { email: string; password: string; name: string }
    >({
      query: (credentials) => ({
        url: "/auth/signup",
        method: "POST",
        body: credentials,
      }),
    }),
  }),
});

export const { useUserLoginMutation, useUserSignupMutation } = userApi;
