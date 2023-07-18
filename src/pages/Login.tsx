/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-misused-promises */
import { Link, useNavigate } from "react-router-dom";
import img from "../assets/book.png";
import { useUserLoginMutation } from "../redux/features/user/userApi";
import { useRef } from "react";

const Login = () => {
  const navigate = useNavigate();
  const [userLogin, { error }] = useUserLoginMutation();
  // Create refs for the input elements
  const emailInputRef = useRef<HTMLInputElement | null>(null);
  const passwordInputRef = useRef<HTMLInputElement | null>(null);

  const handleSubmit = async (e: {
    preventDefault: () => void;
    target: object;
  }) => {
    e.preventDefault();
    const email: string = emailInputRef.current!.value;
    const password: string = passwordInputRef.current!.value;
    const result = await userLogin({ email, password });

    if ("error" in result) {
      // Handle the error here, for example, displaying an error message
    } else if (result.data.success) {
      // If successful, set the access token to localStorage and navigate to the desired page
      localStorage.setItem("accessToken", result.data.data.accessToken);
      navigate("/all-books");
    }
  };

  return (
    <section className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center mt-10 lg:mt-0 py-10">
      <div
        className="tooltip tooltip-bottom hidden lg:block"
        data-tip="Made by Midjouney AI"
      >
        <img className="w-2/3 mx-auto" src={img} alt="hero" />
      </div>
      <div className="md:w-4/5 mx-auto">
        <form onSubmit={handleSubmit}>
          <h1 className="text-3xl font-bold mb-5 ">Welcome back, Reader!</h1>
          {error ? (
            "data" in error ? (
              <h1 className="text-sm text-error">
                {(error as any).data.message}
              </h1>
            ) : (
              <h1 className="text-sm text-error">Unknown error occurred.</h1>
            )
          ) : (
            <h1 className="text-sm">Our ship has been adrift without you.</h1>
          )}
          <input
            placeholder="EMAIL"
            className="rounded-none bg-transparent focus:outline-0 input input-ghost border-0 border-b-2 border-b-primary w-full my-4"
            type="email"
            name="email"
            ref={emailInputRef}
            required
          />
          <input
            placeholder="PASSWORD"
            className="rounded-none bg-transparent focus:outline-0 input input-ghost border-0 border-b-2 border-b-primary w-full my-4"
            type="password"
            name="password"
            ref={passwordInputRef}
            required
          />
          <div className="flex justify-between items-center">
            <label className="label cursor-pointer">
              <input
                type="checkbox"
                className="checkbox checkbox-primary checkbox-xs rounded-none"
              />
              <span className="label-text ml-2">Remember me</span>
            </label>
            <Link className=" link link-primary text-sm" to="/password-reset">
              Forgot Password
            </Link>
          </div>

          <button
            className="btn btn-primary w-full mt-4"
            value="Send"
            type="submit"
          >
            Sign in
          </button>
        </form>
        <p className="mt-4 ">
          Don't have an account?{" "}
          <Link className="link link-primary" to="/signup">
            Sign up
          </Link>{" "}
        </p>
      </div>
    </section>
  );
};

export default Login;
