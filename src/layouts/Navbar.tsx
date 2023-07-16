import { Link, useNavigate } from "react-router-dom";
const Navbar = () => {
  const token = localStorage.getItem("accessToken");
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.setItem("accessToken", "");
    navigate("/");
  };
  const menuItems = (
    <>
      <li>
        <Link to="all-books">All Books</Link>
      </li>
      {!token ? (
        <>
          <li>
            <Link to="login">Login</Link>
          </li>
          <li>
            <Link to="signup">Signup</Link>
          </li>
        </>
      ) : (
        <>
          <li>
            <Link to="add-new-book">Add New Book</Link>
          </li>
          <li>
            <button onClick={handleLogout}>Logout</button>
          </li>
        </>
      )}
    </>
  );
  return (
    <div className="navbar bg-base-100 p-0">
      <div className="navbar-start">
        <div className="dropdown">
          <label tabIndex={0} className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </label>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
          >
            {menuItems}
          </ul>
        </div>
        <Link to="/" className="btn btn-ghost normal-case text-xl">
          ShelfScribe
        </Link>
      </div>
      <div className="navbar-end hidden lg:flex">
        <ul className="menu menu-horizontal px-1 gap-14">{menuItems}</ul>
      </div>
    </div>
  );
};

export default Navbar;
