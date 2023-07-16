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
  }),
});

export const { useUserLoginMutation } = userApi;
