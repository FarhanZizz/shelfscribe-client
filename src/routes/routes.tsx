import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import AllBooks from "../pages/AllBooks";
import BookDetails from "../pages/BookDetails";
import AddNewBook from "../pages/AddNewBook";
import UpdateBook from "../pages/UpdateBook";
import Wishlist from "../pages/Wishlist";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/signup",
        element: <Signup />,
      },
      {
        path: "/all-books",
        element: <AllBooks />,
      },
      {
        path: "/book/:id",
        element: <BookDetails />,
      },
      {
        path: "/add-new-book",
        element: <AddNewBook />,
      },
      {
        path: "user/wishlist",
        element: <Wishlist />,
      },
      {
        path: "/edit-book/:id",
        element: <UpdateBook />,
      },
    ],
  },
]);

export default routes;
