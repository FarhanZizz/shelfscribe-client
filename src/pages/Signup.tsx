/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import img from "../assets/books.png";
import {
  useUserLoginMutation,
  useUserSignupMutation,
} from "../redux/features/user/userApi";

const Signup = () => {
  const navigate = useNavigate();
  const [userSignup, { isLoading, isError, error }] = useUserSignupMutation();
  const [userLogin] = useUserLoginMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;
    const name = form.name.value;

    const signupResult = await userSignup({ email, password, name });
    if (signupResult.data.success === true) {
      const loginResult = await userLogin({ email, password });
      // If successful, set the access token to localStorage
      localStorage.setItem("accessToken", loginResult.data.data.accessToken);
      navigate("/all-books");
    }
  };

  return (
    <section className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center mt-10 lg:mt-0 py-10">
      <div
        className="tooltip tooltip-bottom hidden lg:block"
        data-tip="Made by Midjouney AI"
      >
        <img src={img} alt="hero" />
      </div>
      <div className="md:w-4/5 mx-auto">
        <form onSubmit={handleSubmit}>
          <h1 className="text-3xl font-bold mb-5">Join us today!</h1>
          {isError ? (
            <h1 className="text-sm text-error">{error?.data?.message}</h1>
          ) : (
            <h1 className="text-sm">
              Become one of the cool kids on the block.
            </h1>
          )}
          <input
            placeholder="NAME"
            className="rounded-none bg-transparent focus:outline-0 input input-ghost border-0 border-b-2 border-b-primary w-full my-4"
            type="text"
            name="name"
            required
          />
          <input
            placeholder="EMAIL"
            className="rounded-none bg-transparent focus:outline-0 input input-ghost border-0 border-b-2 border-b-primary w-full my-4"
            type="email"
            name="email"
            required
          />
          <input
            placeholder="PASSWORD"
            className="rounded-none bg-transparent focus:outline-0 input input-ghost border-0 border-b-2 border-b-primary w-full my-4"
            type="password"
            name="password"
            required
          />
          <button className="btn btn-primary w-full mt-4" type="submit">
            Sign Up
          </button>
        </form>

        <p className="mt-4 ">
          Already have an account?{" "}
          <Link className="link link-primary" to="/login">
            Log In
          </Link>{" "}
        </p>
      </div>
    </section>
  );
};

export default Signup;
