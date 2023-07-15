import { Link } from "react-router-dom";
import { BsGoogle } from "react-icons/bs";
import img from "../assets/book.png";

const Login = () => {
  return (
    <section className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center mt-10 lg:mt-0 py-10">
      <div
        className="tooltip tooltip-bottom hidden lg:block"
        data-tip="Made by Midjouney AI"
      >
        <img className="w-2/3 mx-auto" src={img} alt="hero" />
      </div>
      <div className="md:w-4/5 mx-auto">
        <form>
          <h1 className="text-3xl font-bold mb-5 ">Welcome back, Reader!</h1>
          {/* {error ? (
            <h1 className="text-sm text-error">{error}</h1>
          ) : (
            <h1 className="text-sm">Our ship has been adrift without you.</h1>
          )} */}
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
        <div className="divider">OR</div>
        <button className="btn bg-base-100 hover:bg-base-100 text-primary  w-full">
          <BsGoogle className="mr-2"></BsGoogle>Sign in with Google
        </button>
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
