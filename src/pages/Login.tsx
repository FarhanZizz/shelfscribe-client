/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { Link } from "react-router-dom";
import img from "../assets/book.png";
import { useUserLoginMutation } from "../redux/features/user/userApi";

const Login = () => {
  const [userLogin, { isLoading, isError, error }] = useUserLoginMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;
    await userLogin({ email, password }).then((result) => {
      console.log(result);
      // Check if the login was successful
      if (result.data.success) {
        // If successful, set the access token to localStorage
        localStorage.setItem("accessToken", result.data.data.accessToken);
      }
    });
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
          {isError ? (
            <h1 className="text-sm text-error">{error.data.message}</h1>
          ) : (
            <h1 className="text-sm">Our ship has been adrift without you.</h1>
          )}
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
