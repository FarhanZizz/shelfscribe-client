import { api } from "../../api/apislice";
import { IGenericResponse, ILoginResponse } from "../../../types/globaltypes";

const userApi = api.injectEndpoints({
  endpoints: (builder) => ({
    userLogin: builder.mutation<
      ILoginResponse,
      { email: string; password: string }
    >({
      query: ({ email, password }) => ({
        url: "/auth/login",
        method: "POST",
        body: { email, password },
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
